#!/usr/bin/env node

const fs = require("fs-extra");
const path = require("path");
const ora = require("ora");
const prompts = require("prompts");
const { exec } = require("promisify-child-process");
const format = require("./src/utils/format.js");
const yargs = require("yargs");
const chalk = require("chalk");
const ejs = require("ejs");
let args = {
  verbose: yargs.argv.verbose ? true : false,
  install: yargs.argv.install ? true : false,
  extract: yargs.argv.extract ? true : false,
  entrypoints: ['main'],
  git: yargs.argv.git ? true : false,
};

const hasMultipleEntrypoints = yargs.array('entrypoints').argv && 
yargs.array('entrypoints').argv.entrypoints &&
yargs.array('entrypoints').argv.entrypoints.length > 0;

if(hasMultipleEntrypoints) {
  args.entrypoints = yargs.array('entrypoints').argv.entrypoints.map((entrypoint) => {
    entrypoint = entrypoint.replace(/[^A-Za-z\s]/g, ' ').trim();
    return format.dash(entrypoint); 
  });
}

let fullProjectPath = "";
let spinner;
let counter = 1;
let data;

/**
 * Output intro message.
 */
const outputIntroMessage = () => {
  process.stdout.write("\u001b[2J\u001b[0;0H");
  console.log(chalk.cyan("====================="));
  console.log(chalk.cyan("Webpack-5-Boilerplate"));
  console.log(chalk.cyan("====================="));
  console.log("");
  console.log("You're about to run the setup script for your project in this directory:");
  console.log("");
  console.log(chalk.bgGreen(chalk.black(` ${process.cwd()} `)));
  console.log("");
}

/**
 * Output outro message.
 */
const outputOutroMessage = (data) => {
  console.log("");
  console.log(`Your project is now ready!`);
  console.log("");

  if (data.args.install === true && data.args.extract === false) {
    console.log(`Please ${chalk.green("cd")} into the ${chalk.green(`${data.folderName}`)} folder and run ${chalk.green("npm start")} to start developing.`);
  }

  if (data.args.install === true && data.args.extract === true) {
    console.log(`Please run ${chalk.green("npm start")} in the current directory to start developing.`);
  }

  if (data.args.install === false && data.args.extract === false) {
    console.log(`Please ${chalk.green("cd")} into the ${chalk.green(`${data.folderName}`)} folder and run ${chalk.green("npm install")}.\nAfter the required dependencies have been installed run ${chalk.green("npm start")} to start developing.`);
  }

  if (data.args.install === false && data.args.extract === true) {
    console.log(`Please run ${chalk.green("npm install")} in the current directory.\nAfter the required dependencies have been installed run ${chalk.green("npm start")} to start developing.`);
  }

  console.log("");
}

const copyTpl = (fromFile, toFile, data) => {
  const encoding = "utf-8";
  const template = fs.readFileSync(`${fromFile}`, encoding);
  const file = ejs.render(template, data);
  fs.writeFileSync(`${toFile}`, file, encoding);
};

/**
 * Output exit message and exit process.
 */
const onCancel = (prompt) => {
  console.log("");
  console.log("Exiting script...");
  process.exit();
};

/**
 * Output error exception and exit process.
 */
const onError = (exception, spinner) => {
  if(spinner) {
    spinner.fail();
  }
  console.log(`${chalk.bgRed("Error")}${chalk.red(" - ")}${exception}`);
  process.exit();
};

/**
 * Runs before the setup for some sanity checks.
 */
const preFlightChecklist = async () => {

  if (data.createFolder && fs.existsSync(fullProjectPath) === true) {
    throw new Error(`A folder with the name "${data.folderName}" already exists at this location. Please select a different name for your project and try again.`);
  }

  if (args.git) {
    // WARNING - Check if git is installed.
    await exec("git --version")
    .then(() => {
      // all good.
    })
    .catch(() => {
      throw new Error('Unable to check Git\'s version ("git --version"), please make sure Git is installed and globally available before running this script.');
    });
  }
};

/**
 * Run the entire program.
 */
const run = async () => {
  data = { args: args };

  outputIntroMessage();

  // Prompt user for all user data.
  const answers = await prompts(
    [
      {
        type: "text",
        name: "projectName",
        message: `Please enter the project name:`,
        validate: (value) => {
          const pattern = /^[^\s^\x00-\x1f\\?*:"";<>|\/.][^\x00-\x1f\\?*:"";<>|\/]*[^\s^\x00-\x1f\\?*:"";<>|\/.]+$/g;

          if(value.trim().length < 1) {
            return `The project name is required and cannot be blank.`; 
          }

          if(value.length < 2) {
            return `The project name must contain at least 2 characters.`;
          }

          if(pattern.test(value) === false && data.args.extract === false) {
            return `The project name is invald! Ensure that the project name is also a valid folder name.`;
          }

          return true;
        }
      },

      {
        type:  (data.args.verbose === true) ? "text" : null,
        name: "authorName",
        message: `Please enter the name of the project author:`,
      },

      {
        type: (data.args.verbose === true) ? "text" : null,
        name: "authorEmail",
        message: `Please enter the author email:`,
        validate: (value) => {
          if (value === '') {
            return true;
          } else {
            return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value) === false) ? `You have entered an invalid email address!` : true
          }
        }
      },

      {
        type:  (data.args.verbose === true) ? "text" : null,
        name: "projectDescription",
        message: `Please enter a project description:`,
      },

      {
        type: 'multiselect',
        name: 'dependencies',
        message: 'Do you wish to include any of the following front-end dependencies?',
        choices: [
          { 
            title: 'Tailwind.css', 
            value: 'tailwind',
            selected: true 
          }
        ],
        instructions: false,
        hint: "- Space to select. Return to submit."
      }

    ],
    { onCancel }
  );

  data.author = {
    name: answers.authorName ? answers.authorName : '',
    email: answers.authorEmail ? answers.authorEmail : '',
    full: answers.authorName ? `${answers.authorName}${answers.authorEmail ? ' <' + answers.authorEmail + '>' : ''}` : ''
  };

  data.projectName        = answers.projectName;
  data.projectDescription = answers.projectDescription || '';
  data.folderName         = (data.args.extract !== true) ? answers.projectName : '';
  data.packageName        = format.underscore(data.projectName);
  data.tailwind           = answers.dependencies.includes('tailwind');
  data.year               = new Date().getFullYear();

  // Globally save the package (because it's also our folder name)
  fullProjectPath = path.join(process.cwd(), data.folderName);

  console.log("");
  console.log("Let's get started, this might take a while...");
  console.log("");

  // -----------------------------
  //  1. Preflight checklist
  // -----------------------------

  spinner = ora(`${counter}. Pre-flight checklist`).start();
  await preFlightChecklist()
    .then(() => { 
      spinner.succeed();
      counter += 1; 
    })
    .catch(exception => { onError(exception, spinner); });
  
  // -----------------------------
  //  2. Copy files
  // -----------------------------

  spinner = ora(`${counter}. Generating project files`).start();
  try {
    const folders = {
      input: {
        'core': path.resolve(__dirname, 'src/templates/core'),
        'package-json': path.resolve(__dirname, 'src/templates/package-json'),
        'postcss-config': path.resolve(__dirname, 'src/templates/postcss-config'),
        'git': path.resolve(__dirname, 'src/templates/git'),
        'js': path.resolve(__dirname, 'src/templates/js'),
        'css': path.resolve(__dirname, 'src/templates/css'),
        'tailwind': path.resolve(__dirname, 'src/templates/tailwind'),
        'webpack-config': path.resolve(__dirname, 'src/templates/webpack-config')
      },
      output: `./${data.folderName}`
    };
    
    // Copy core files
    fs.copySync(folders.input['core'], folders.output);

    // Create missing folders
    fs.mkdirSync(`${folders.output}/src/fonts`, { recursive: true });
    fs.mkdirSync(`${folders.output}/src/images`, { recursive: true });
    fs.mkdirSync(`${folders.output}/src/media`, { recursive: true });
    fs.mkdirSync(`${folders.output}/src/scripts`, { recursive: true });
    fs.mkdirSync(`${folders.output}/src/static`, { recursive: true });
    fs.mkdirSync(`${folders.output}/src/styles/components`, { recursive: true });

    data.args.entrypoints.forEach(entrypoint => {
      const entrypointData = {
        ...data,
        entrypoint: entrypoint
      };
      
      copyTpl(`${folders.input['js']}/_index.js.ejs`, `${folders.output}/src/scripts/${entrypoint}.js`, entrypointData);
      copyTpl(`${folders.input['css']}/_index.css.ejs`, `${folders.output}/src/styles/${entrypoint}.css`, entrypointData);
    });

    if (data.tailwind === true) {
      copyTpl(`${folders.input['tailwind']}/tailwind.js`, `${folders.output}/tailwind.js`, data);
      copyTpl(`${folders.input['tailwind']}/tailwind.css`, `${folders.output}/src/styles/tailwind.css`, data);
    }

    if (data.args.git) {
      copyTpl(`${folders.input['git']}/_gitattributes.ejs`, `${folders.output}/.gitattributes`, data);
      copyTpl(`${folders.input['git']}/_gitignore.ejs`, `${folders.output}/.gitignore`, data);
      copyTpl(`${folders.input['git']}/_gitkeep.ejs`, `${folders.output}/src/fonts/.gitkeep`, data);
      copyTpl(`${folders.input['git']}/_gitkeep.ejs`, `${folders.output}/src/images/.gitkeep`, data);
      copyTpl(`${folders.input['git']}/_gitkeep.ejs`, `${folders.output}/src/media/.gitkeep`, data);
      copyTpl(`${folders.input['git']}/_gitkeep.ejs`, `${folders.output}/src/static/.gitkeep`, data);
      copyTpl(`${folders.input['git']}/_gitkeep.ejs`, `${folders.output}/src/styles/components/.gitkeep`, data);
    }
  
    copyTpl(`${folders.input['webpack-config']}/_webpack.base.conf.js.ejs`, `${folders.output}/src/tools/config/webpack/webpack.base.conf.js`, data);
    copyTpl(`${folders.input['postcss-config']}/_postcss.config.js.ejs`, `${folders.output}/postcss.config.js`, data);
    copyTpl(`${folders.input['package-json']}/_package.json`, `${folders.output}/package.json`, data);

    spinner.succeed();
    counter += 1;
  } catch(exception) { 
    onError(exception, spinner); 
  }

  // -----------------------------
  //  3. Install node dependencies
  // -----------------------------

  if (data.args.install) {
    spinner = ora(`${counter}. Installing NPM dependencies`).start();
    await exec(`cd "${fullProjectPath}" && npm install`)
      .then(() => { 
        spinner.succeed();
        counter += 1; 
      })
      .catch(exception => { onError(exception, spinner); });
  }

  // -----------------------------
  //  4. Init git repo
  // -----------------------------

  if (data.args.git) {
    spinner = ora(`${counter}. Initializing git repo`).start();
    await exec(`cd "${fullProjectPath}" && git init`)
      .then(() => { 
        spinner.succeed();
        counter += 1; 
      })
      .catch(exception => { onError(exception, spinner); });
  }

  // -----------------------------
  //  5. Success
  // -----------------------------

  outputOutroMessage(data);
};

try {
  run();
} catch (error) {
  console.log(error);
  process.exit(1);
}
