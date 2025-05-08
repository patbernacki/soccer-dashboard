const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect(err => {
  if (err) {
    console.error('error connecting to db', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Sample endpoint to test DB connection
app.get('/teams', (req, res) => {
  db.query('SELECT * FROM teams', (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
});

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
