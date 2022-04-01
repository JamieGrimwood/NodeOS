const db = require('quick.db');
const bcrypt = require("bcrypt");
const saltRounds = 10;

const password = "root";
bcrypt.genSalt(saltRounds, function (err, salt) {
    bcrypt.hash(password, salt, async function (err, hash) {
        await db.set('system.users', { root: { password: hash, superuser: true } })
    });
});
console.log("Created root user. Username: root Password: root")
db.set('system.hostname', "nodeos")
console.log("Set hostname")