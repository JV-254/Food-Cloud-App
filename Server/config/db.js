// Server/config/db.js
const mysql = require('mysql2');
require('dotenv').config();

// Create a connection pool to manage concurrent database tasks
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '(Njau@7)2004',
  database: process.env.DB_NAME || 'foodcloud_db',
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Export the promise wrapper so we can use async/await across controllers
module.exports = pool.promise();