const mysql = require("mysql2/promise");

const DB_NAME = "medlar";

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "1604pv",
  database: DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  dateStrings: true,
});

module.exports = { pool, DB_NAME };
