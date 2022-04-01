const db = require(`./database`)

const prompt = require('prompt-sync')({
    history: require('prompt-sync-history')(), //open history file
    sigint: true
});

let isLoggedIn = false
let currentDir = __dirname

async function login() {
    const username = await prompt(`Login: `)
    const password = await prompt(`Password: `)
    const check = db.checkLogin(username, password)
    if (check === true) {
        isLoggedIn = true
        welcome()
    } else {
        console.log("Invalid login. Please try again.")
        login()
    }
}
login()

async function welcome() {
    console.log("Welcome to NodeOS!")
    console.log(`Type "help" for a list of commands.`)
    input()
}

async function input() {
    if (isLoggedIn != true) return login()
    const hostname = db.getHostname()
    const input = prompt(`${currentDir}$`)
}