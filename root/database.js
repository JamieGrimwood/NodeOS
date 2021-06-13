const Keyv = require('keyv');
const db = new Keyv('sqlite://root/database.sqlite');

db.on('error', err => {
    console.log("An error has occured when attempting to access the database.")
    process.exit();
});

module.exports = db;