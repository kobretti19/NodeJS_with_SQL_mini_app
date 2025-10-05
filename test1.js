const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql2');
require('dotenv').config();

app.use(bodyParser.urlencoded({ extended: true }));

const allUsers = 'SELECT COUNT(*)AS count FROM users';

app.get('/', (req, res) => {
  const connection = mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'join_us',
  });
  connection.query(allUsers, async function (err, results) {
    try {
      const count = await results[0].count;
      res.status(200).send(`We have ${count} users`);
      connection.end();
    } catch (err) {
      res.send(err.message);
      connection.end();
    }
  });
});

module.exports = app;
