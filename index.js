const firstRun = require("first-run");
firstRun.clear();
const chalk = require("chalk");
const { textSync } = require("figlet");
const log = console.log;
const prompt = require("prompt-sync")();
const path = require("path");
const fs = require("fs");
const db = require("./root/database")

if (firstRun() === true) async () => {
  await db.set("user.root.username", "root");
  await db.set("user.root.password", "root");
}

function loginCredentials() {
  const inputUsername = prompt("Login:");
  const inputPassword = prompt("Password:");
  CheckLogin(inputUsername, inputPassword);
}
console.clear();
loginCredentials();

async function CheckLogin(inputUsername, inputPassword) {
  let dbPass = await db.get("user." + inputUsername + ".password");
  console.log(dbPass)

  if (dbPass === inputPassword) {
    db.set("currentDir", "/");
    welcomePage();
  } else {
    log(chalk.red("Incorrect username and or password!"));
    loginCredentials();
  }
}

async function welcomePage() {
  console.clear();
  let currentDir = db.get(`currentDir`);
  console.log(
    chalk.cyanBright(textSync("NodeOS", { horizontalLayout: "fitted" }))
  );
  console.log(
    chalk.greenBright(
      'Welcome to NodeOS! This is an emulated OS written in javascript. Run "help" to see a list of available commands :)'
    )
  );
  const inputCommand = prompt(`${currentDir} : `);
  checkCommand(inputCommand);
}

async function commandInput() {
  let currentDir = db.get(`currentDir`);
  const inputCommand = prompt(`${currentDir} : `);
  checkCommand(inputCommand);
}

async function checkCommand(inputCommand) {
  let params = inputCommand.split(" ") // lazy to do it the efficient way
  let cmd = params.shift();

  if (cmd === "shutdown" || cmd === "exit") {
    shutdownSequence();
  } else {
    if (fs.existsSync(`./addons/${cmd}.js`)) {
      let package = require(`./addons/${cmd}`);

      if (!params.length) {
        console.log(package.no_params);
      } else {
        if (package[params[0]]) {
          if (typeof package[params[0]] == "string") {
            console.log(package[params[0]]);
          } else {
            package[params.shift()](params);
          };
        } else {
          console.log(package.invalid_parameters || package.no_params);
        }
      }

    } else {
      console.log(chalk.red("Invalid command. Please type \"help\" for a list of commands."))
    }
    commandInput();
  }
}

async function shutdownSequence() {
  console.clear();
  console.log("Stopping process");
  console.log("Disconecting from the database")
  db.close();
  process.exit();
}
