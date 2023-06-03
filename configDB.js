const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'omri',
  password: 'omri199812',
  database: 'hirehive',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err.stack);
    return;
  }

  console.log('Connected to database.');

//   db.query('CREATE TABLE IF NOT EXISTS candidates(id INT AUTO_INCREMENT PRIMARY KEY,email VARCHAR(255),password VARCHAR(255), first_name VARCHAR(255), last_name VARCHAR(255),age INT, phone VARCHAR(255), birthday Date, photo VARCHAR(255), location VARCHAR(255), about VARCHAR(255))', (err, result) => {
//     if (err) console.error('Error creating candidates table:', err.stack);
//     else console.log('Candidates table created:', result);
//   });

//   db.query('CREATE TABLE IF NOT EXISTS employers(id INT AUTO_INCREMENT PRIMARY KEY, email VARCHAR(255),password VARCHAR(255), business_name VARCHAR(255), location VARCHAR(255), type VARCHAR(255), photo VARCHAR(255), about VARCHAR(255))', (err, result) => {
//     if (err) console.error('Error creating employers table:', err.stack);
//     else console.log('Employers table created:', result);
//   });

//   db.query('CREATE TABLE IF NOT EXISTS jobs(id INT AUTO_INCREMENT PRIMARY KEY, employer_id INT ,location VARCHAR(255), min_age INT, max_age INT, description VARCHAR(500))', (err, result) => {
//     if (err) console.error('Error creating jobs table:', err.stack);
//     else console.log('Jobs table created:', result);
//   });

//   db.query('SELECT * FROM jobs', (err, result) => {
//     if (err) console.error('Error retrieving data:', err.stack);
//     else console.log('Retrieved data:', result);
//   });
 });

module.exports = db;
