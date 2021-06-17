var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./root/database.sqlite');

module.exports = db;