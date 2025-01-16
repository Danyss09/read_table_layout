const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const app = express();

app.use(bodyParser.json());

// Database connection setup
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', // replace with your MySQL username
    password: 'dani0919', // replace with your MySQL password
    database: 'TableReadDb'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL: ', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// Read all Table Layouts endpoint
app.get('/read-table', (req, res) => {
    const query = 'SELECT * FROM Tables';

    connection.query(query, (err, result) => {
        if (err) {
            console.error('Error retrieving tables: ', err);
            return res.status(500).json({ message: 'Error retrieving tables' });
        }

        if (result.length === 0) {
            return res.status(404).json({ message: 'No tables found' });
        }

        res.status(200).json(result);
    });
});

app.listen(3000, () => {
    console.log('Read All Table Layout microservice is running on port 3000');
});
