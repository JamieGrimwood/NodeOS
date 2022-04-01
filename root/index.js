const db = require(`./database`)

const prompt = require('prompt-sync')({
    history: require('prompt-sync-history')() //open history file
});

async function login() {
    const username = await prompt(`Login: `)
    const password = await prompt(`Password: `)

}
login()
prompt.history.save()