const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const path = require('path');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files

// Create MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'mutondwa',
  password: 'mutondwa24',
  database: 'my_cv_db'
});

connection.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});

// API endpoints for CRUD operations


// Serve the HTML pages
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'Portfolio.html'));
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
