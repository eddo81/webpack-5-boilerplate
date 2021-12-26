#!/usr/bin/env node

const fs = require("fs-extra");
const path = require("path");
const ora = require("ora");
const prompts = require("prompts");
const { exec } = require("promisify-child-process");
const format = require("./src/utils/format.js");
const argv = require("yargs").argv;
const chalk = require("chalk");
const ejs = require("ejs");
let args = {
  verbose: argv.verbose || argv.v ? true : false,
  install: argv.install || argv.i ? true : false,
  git: argv.git || argv.g ? true : false,
};

let fullProjectPath = "";
let spinner;
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
const outputOutroMessage = (folderName, doInstall, createFolder) => {
  console.log("");
  console.log(`Your project is now ready!`);
  console.log("");

  if (doInstall === true && createFolder === true) {
    console.log(`Please ${chalk.green("cd")} into the ${chalk.green(`${folderName}`)} folder and run ${chalk.green("npm start")} to start developing.`);
  }

  if (doInstall === true && createFolder === false) {
    console.log(`Please run ${chalk.green("npm start")} in the current directory to start developing.`);
  }

  if (doInstall === false && createFolder === true) {
    console.log(`Please ${chalk.green("cd")} into the ${chalk.green(`${folderName}`)} folder and run ${chalk.green("npm install")}.\nAfter the required dependencies have been installed run ${chalk.green("npm start")} to start developing.`);
  }

  if (doInstall === false && createFolder === false) {
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
        validate: value =>
          value.length < 2
            ? `The project name is required and must contain at least 2 characters.`
            : true
      },

      {
        type:  (args.verbose === true) ? "text" : null,
        name: "authorName",
        message: `Please enter the name of the project author:`,
      },

      {
        type: (args.verbose === true) ? "text" : null,
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
        type:  (args.verbose === true) ? "text" : null,
        name: "projectDescription",
        message: `Please enter a project description:`,
      },

      {
        type: "select",
        name: "createProjectFolder",
        message: "Do you wish to create a folder for this project?",
        choices: [
          { 
            title: "No", 
            value: false 
          },
          { 
            title: "Yes", 
            value: true,
						selected: true
          }
        ],
        initial: 1
      },

      {
        type: prev => (prev === true ? "text" : null),
        name: "folderName",
        message: "Please enter the name of the project folder:",
        initial: (prev, values) => format.dash(values.projectName),
        validate: (value) => {
          if(value.trim().length < 1) {
            return 'A folder name is required and cannot be blank.'; 
          } else {
            const pattern = /^[^\s^\x00-\x1f\\?*:"";<>|\/.][^\x00-\x1f\\?*:"";<>|\/]*[^\s^\x00-\x1f\\?*:"";<>|\/.]+$/g;
            return (pattern.test(value) === false) ? `You have entered an invalid folder name!` : true;
          }
        }
      },

      {
        type: 'multiselect',
        name: 'files',
        message: 'Do you wish to include any of the following files/features:',
        choices: [
          { 
            title: 'Tailwind.css', 
            value: 'tailwind',
            selected: true 
          },
          { 
            title: 'README.md', 
            value: 'readme',
            selected: true 
          },
          { 
            title: 'LICENSE', 
            value: 'license',
            selected: true 
          },
          { 
            title: 'EditorConfig',
            value: 'editorconfig',
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
  data.useFolder          = answers.createProjectFolder;
  data.folderName         = data.useFolder ? answers.folderName : '';
  data.packageName        = format.underscore(data.projectName);
  data.tailwind           = answers.files.includes('tailwind');
  data.readme             = answers.files.includes('readme');
  data.license            = answers.files.includes('license');
  data.editorconfig       = answers.files.includes('editorconfig');
  data.year               = new Date().getFullYear();

  // Globally save the package (because it's also our folder name)
  fullProjectPath = path.join(process.cwd(), data.folderName);

  console.log("");
  console.log("Let's get started, it might take a while...");
  console.log("");

  // -----------------------------
  //  1. Preflight checklist
  // -----------------------------

  spinner = ora(`1. Pre-flight checklist`).start();
  await preFlightChecklist()
    .then(() => { spinner.succeed(); })
    .catch(exception => { onError(exception, spinner); });
  
  // -----------------------------
  //  2. Copy files
  // -----------------------------

  spinner = ora(`2. Generating project files`).start();
  try {
    const folders = {
      input: {
        'core': path.resolve(__dirname, 'src/templates/core'),
        'license': path.resolve(__dirname, 'src/templates/license'),
        'package-json': path.resolve(__dirname, 'src/templates/package-json'),
        'postcss-config': path.resolve(__dirname, 'src/templates/postcss-config'),
        'tailwind': path.resolve(__dirname, 'src/templates/tailwind'),
        'readme': path.resolve(__dirname, 'src/templates/readme'),
        'editor-config': path.resolve(__dirname, 'src/templates/editor-config'),
        'webpack-config': path.resolve(__dirname, 'src/templates/webpack-config')
      },
      output: `./${data.folderName}`
    };
  
    fs.copySync(folders.input['core'], folders.output);

    if (data.editorconfig === true) {
      fs.copySync(folders.input['editor-config'], folders.output);
    }

    if (data.license === true) {
      copyTpl(`${folders.input['license']}/_LICENSE`, `${folders.output}/LICENSE`, data);
    }

    if (data.readme === true) {
      copyTpl(`${folders.input['readme']}/_README.md`, `${folders.output}/README.md`, data);
    }

    if (data.tailwind === true) {
      copyTpl(`${folders.input['tailwind']}/tailwind.js`, `${folders.output}/tailwind.js`, data);
      copyTpl(`${folders.input['tailwind']}/tailwind.css`, `${folders.output}/src/styles/tailwind.css`, data);
    }
  
    copyTpl(`${folders.input['webpack-config']}/_webpack.base.conf.js`, `${folders.output}/src/tools/config/webpack/webpack.base.conf.js`, data);
    copyTpl(`${folders.input['postcss-config']}/_postcss.config.js`, `${folders.output}/postcss.config.js`, data);
    copyTpl(`${folders.input['package-json']}/_package.json`, `${folders.output}/package.json`, data);

    spinner.succeed();
  } catch(exception) { 
    onError(exception, spinner); 
  }

  // -----------------------------
  //  3. Install node dependencies
  // -----------------------------

  if (args.install) {
    spinner = ora(`3. Installing NPM dependencies`).start();
    await exec(`cd "${fullProjectPath}" && npm install`)
      .then(() => { spinner.succeed(); })
      .catch(exception => { onError(exception, spinner); });
  }

  // -----------------------------
  //  4. Init git repo
  // -----------------------------

  if (args.git) {
    spinner = ora(`4. Initializing git repo`).start();
    await exec(`cd "${fullProjectPath}" && git init`)
      .then(() => { spinner.succeed(); })
      .catch(exception => { onError(exception, spinner); });
  }

  // -----------------------------
  //  5. Success
  // -----------------------------

  outputOutroMessage(data.folderName, args.install, data.createFolder);
};

try {
  run();
} catch (error) {
  console.log(error);
  process.exit(1);
}
