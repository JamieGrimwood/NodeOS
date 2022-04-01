const db = require('better-sqlite3')('database.db');

(async () => {
    const row = await db.exec(`CREATE TABLE IF NOT EXISTS users('username' varchar PRIMARY KEY, 'password' varchar );`);
    console.log(row);

    const tables = await db.exec(`SELECT * FROM users;`)
    console.log(tables)
})();