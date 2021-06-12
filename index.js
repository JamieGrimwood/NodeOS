const db = require("quick.db");
const firstRun = require("first-run");
firstRun.clear();
const chalk = require("chalk");
const { textSync } = require("figlet");
const log = console.log;
const prompt = require("prompt-sync")();
const path = require("path");
const fs = require("fs");

if (firstRun() === true) {
  db.set("user.root", { password: "root" });
}

function loginCredentials() {
  console.clear();
  const inputUsername = prompt("Login:");
  const inputPassword = prompt("Password:");
  CheckLogin(inputUsername, inputPassword);
}
loginCredentials();

async function CheckLogin(inputUsername, inputPassword) {
  let dbPass = db.get(`user.${inputUsername}.password`);

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
  if (inputCommand === "shutdown" || inputCommand === "exit") {
    shutdownSequence();
  } else {
    let package = require(`./packages/${inputCommand}`)
    console.log(package.command)
  }
  commandInput();
}

async function shutdownSequence() {
  console.clear();
  console.log("Stopping process");
  process.exit();
}
