#!/usr/bin/env node

/**
 * Run the entire program.
 */
const fs = require("fs-extra");
const path = require("path");
const ora = require("ora");
const prompts = require("prompts");
const { exec } = require("promisify-child-process");
const write = require("./src/utils/write.js");
const format = require("./src/utils/format.js");
const copyTpl = require("./src/utils/copyTemplateFile.js");
const argv = require("yargs").argv;
const glob = require("glob");

let args = {
  skip: argv.skip || argv.s ? true : false,
  install: argv.install || argv.i ? true : false,
  git: argv.git || argv.g ? true : false,
};

let fullProjectPath = "";
let counter = 1;
let data;
let summery;

/**
 * Runs before the setup for some sanity checks.
 */
const preFlightChecklist = async () => {

  if (fs.existsSync(fullProjectPath) === true) {
    throw new Error(
      `A folder with the name "${data.folderName}" already exists at this location. Please select a different name for your project and try again.`
    );
  }

  if (args.git) {
    // WARNING - Check if git is installed.
    await exec("git --version")
      .then(() => {
        // all good.
      })
      .catch(() => {
        throw new Error(
          'Unable to check Git\'s version ("git --version"), please make sure Git is installed and globally available before running this script.'
        );
      });
  }
};

/**
 * Performns a cleanup of temporary files.
 */
const cleanup = async () => {
  await fs.remove(path.join(fullProjectPath, "temp"));
};

const run = async () => {
  data = { args: args };

  let confirmed = false;

  write.intro();

  const onCancel = prompt => {
    console.log("");
    console.log("Exiting script...");
    process.exit();
  };

  do {
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
          type:  (args.skip !== true) ? "text" : null,
          name: "authorName",
          message: `Please enter the name of the project author:`,
        },

        {
          type: (args.skip !== true) ? "text" : null,
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
          type:  (args.skip !== true) ? "text" : null,
          name: "projectDescription",
          message: `Please enter a project description:`,
        },

        {
          type: "select",
          name: "useTailwind",
          message: "Do you wish to include the Tailwind.css library in this project:",
          choices: [
            { title: "No", value: false, selected: true },
            { title: "Yes", value: true }
          ],
          initial: 1
        }
      ],
      { onCancel }
    );

    data.author = {
      name: answers.authorName ? answers.authorName : '',
      email: answers.authorEmail ? answers.authorEmail : '',
      full: answers.authorName ? `${answers.authorName}${answers.authorEmail ? ' <' + answers.authorEmail + '>' : ''}${answers.authorUrl ? ' (' + answers.authorUrl + ')' : ''}` : ''
    };
    data.projectName        = answers.projectName;
    data.projectDescription = answers.projectDescription || '';
    data.folderName         = format.dash(data.projectName);
    data.packageName        = format.underscore(data.projectName);
    data.tailwind           = answers.useTailwind === true;
    data.year               = new Date().getFullYear();

    // Globally save the package (because it's also our folder name)
    fullProjectPath = path.join(process.cwd(), data.folderName);

    summery = {
      "Project name": data.projectName,
      "Project features": answers.features,
    };

    // Display summery
    write.summary(summery);

    const confirm = await prompts(
      {
        type: "toggle",
        name: "continue",
        message: "Confirm settings to continue...",
        initial: true,
        active: "confirm",
        inactive: "cancel"
      },
      { onCancel }
    );

    confirmed = confirm.continue;

    if (confirmed !== true) {
      write.intro();
    }
  } while (confirmed !== true);

  write.letsGo();

  // -----------------------------
  //  1. Preflight checklist
  // -----------------------------

  if (args.skip) {
    ora(`${counter}. Skipping Pre-flight checklist`)
      .start()
      .succeed();
    counter += 1;
  } else {
    const spinnerChecklist = ora(`${counter}. Pre-flight checklist`).start();
    await preFlightChecklist()
      .then(() => {
        spinnerChecklist.succeed();
        counter += 1;
      })
      .catch(exception => {
        spinnerChecklist.fail();
        write.error(exception);
        process.exit();
      });
  }

  // -----------------------------
  //  2. Clone repo
  // -----------------------------

  const gitUrl = `https://github.com/eddo81/webpack-5-boilerplate.git`;

  const spinnerClone = ora(`${counter}. Cloning the github repo`).start();
  await exec(`git clone ${gitUrl} ${data.folderName}/temp`)
    .then(() => {
      spinnerClone.succeed();
      counter += 1;
    })
    .catch(exception => {
      spinnerClone.fail();
      write.error(exception);
      process.exit();
    });

  // -----------------------------
  //  3. Copy files
  // -----------------------------

  const spinnerCopy = ora(`${counter}. Copying files from temp folder`).start();
  await exec(`cd "${data.folderName}"`)
    .then(() => {
      spinnerCopy.succeed();
      counter += 1;

      let files = glob.sync(`./${data.folderName}/temp/src/templates/copy/**/*.*`);

      files.forEach(templateFile => {
        let toFile = (templateFile.endsWith('.ejs') === true) ? templateFile.substring(0, templateFile.length - 4) : templateFile;
        copyTpl(templateFile, toFile, data);
      });

      fs.copySync(
        `./${data.folderName}/temp/src/templates/copy`,
        `./${data.folderName}`,
        {
          filter: n => {
            return !n.endsWith('.ejs');
          }
        }
      );

      copyTpl(
        `./${data.folderName}/temp/src/templates/modify/_postcss.config.js`,
        `./${data.folderName}/src/postcss.config.js`,
        data
      );

      copyTpl(
        `./${data.folderName}/temp/src/templates/modify/_index.css`,
        `./${data.folderName}/src/styles/index.css`,
        data
      );

      if (data.tailwind !== false) {
        const tailwindConfigDir = `./${data.folderName}/src/tools/config/tailwind`;

        if (!fs.existsSync(tailwindConfigDir)){
          fs.mkdirSync(tailwindConfigDir, { recursive: true });
        }

        copyTpl(
          `./${data.folderName}/temp/src/templates/modify/_tailwind.js`,
          `./${data.folderName}/src/tools/config/tailwind/tailwind.js`,
          data
        );
      }
    })
    .catch(exception => {
      spinnerCopy.fail();
      write.error(exception);
      process.exit();
    });

  // -----------------------------
  //  4. Cleanup
  // -----------------------------

  const spinnerCleanup = ora(`${counter}. Cleaning project folder`).start();
  await cleanup()
    .then(() => {
      spinnerCleanup.succeed();
      counter += 1;
    })
    .catch(exception => {
      spinnerCleanup.fail();
      write.error(exception);
      process.exit();
    });

  // -----------------------------
  //  5. Install node dependencies
  // -----------------------------

  if (args.install) {
    const spinnerNode = ora(`${counter}. Installing NPM dependencies`).start();
    await exec(`cd "${fullProjectPath}" && npm install`)
      .then(() => {
        spinnerNode.succeed();
        counter += 1;
      })
      .catch(exception => {
        spinnerNode.fail();
        write.error(exception);
        process.exit();
      });
  }

  // -----------------------------
  //  6. Init git repo
  // -----------------------------

  if (args.git) {
    const spinnerInit = ora(`${counter}. Initializing git repo`).start();
    await exec(`cd "${fullProjectPath}" && git init`)
      .then(() => {
        spinnerInit.succeed();
        counter += 1;
      })
      .catch(exception => {
        spinnerInit.fail();
        write.error(exception);
        process.exit();
      });
  }

  // -----------------------------
  //  9. Success
  // -----------------------------
  write.outro(data.folderName, args.install);
};

try {
  run();
} catch (error) {
  console.log(error);
  process.exit(1);
}
