const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',           // Change this to your MySQL username
  password: 'yourpassword',           // Change this to your MySQL password
  database: 'expense_tracker',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err.message);
    console.error('Please check your database configuration in config/database.js');
    return;
  }
  console.log('Successfully connected to MySQL database');
  connection.release();
});

module.exports = pool.promise();
