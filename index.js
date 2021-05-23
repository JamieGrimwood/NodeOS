const db = require('quick.db');
const firstRun = require('first-run');
firstRun.clear()
const chalk = require('chalk');
const { textSync } = require('figlet');
const log = console.log;

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

if (firstRun() === true) {
  db.set('root', { password: 'root' })
}

loginCredentials()
function loginCredentials() {
readline.question('Login:', inputUsername => {
  readline.question('Password:', inputPassword => {
  CheckLogin(inputUsername, inputPassword)
  readline.close();
});
});
}


async function CheckLogin(inputUsername, inputPassword) {
  let dbPass = db.get(`${inputUsername}.password`)

  if (dbPass === inputPassword) {
    db.set('currentDir', { currentDir: '/' })
    welcomePage()
  } else {
    log(chalk.red("Incorrect username and or password!"));
    loginCredentials();
  }
}

async function welcomePage() {
    let currentDir = db.get(`currentDir.currentDir`)
    console.log(chalk.cyanBright(textSync('NodeOS', { horizontalLayout: 'fitted' })));
    console.log(chalk.greenBright('Welcome to NodeOS! This is an emulated OS written in javascript. Run \"help\" to see a list of available commands :)'))
    readline.question(`${currentDir} :`, inputCommand => {
    checkCommand(inputCommand)
    })
    readline.close();
}

async function checkCommand() {
    console.log("working")
}