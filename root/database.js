const db = require('quick.db');
const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = {
    async checkLogin(username, password) {
        return new Promise(async (resolve, reject) => {
            const user = db.get(`system.users.${username}`)
            console.log(user)
            console.log(password)
            console.log(user.password)
            if (!user) resolve("false")
            console.log(1)
            const req = await bcrypt.compare(password, user.password)
            console.log(2)
            console.log(req)
            if (req === true) {
                resolve(true)
            } else {
                resolve(false)
            }
        })
    },
    async getHostname() {
        return new Promise((resolve, reject) => {
            const req = db.get(`system.hostname`)
            resolve(req)
        })
    },
}