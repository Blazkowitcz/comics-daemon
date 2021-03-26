const mysql = require('mysql');
const db = mysql.createConnection({
    host: "127.0.0.1",
    user: "user",
    password: "password",
    database: "database"
});

db.connect(function(err) {
    if(err) { throw err; }
});

module.exports = { db };