var express = require('express');
require('dotenv').config();
var { faker } = require('@faker-js/faker');
var bodyParser = require('body-parser');
var mysql = require('mysql2');
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));

var connection = mysql.createConnection({
  host: 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: 'join_us',
});

let data = [];

for (let i = 0; i < 500; i++) {
  data.push([faker.internet.email(), faker.date.past()]);
}

const q = 'INSERT INTO users (email, created_at) VALUES ?';

connection.query(q, [data], function (err, result) {
  if (err) throw err;
  console.log(result);
});

connection.end();
// const q = 'SELECT * FROM users';

// connection.query(q, function (error, results, fields) {
//   if (error) throw error;
//   const email = results.map((user) => user.email);

//   console.log(email);
// });

// const person = {
//   email: faker.internet.email(),
//   created_at: faker.date.past(),
// };

// connection.query(
//   'INSERT INTO users SET ?',
//   person,
//   function (error, results, fields) {
//     if (error) throw error;
//     console.log(results);
//   }
// );

// connection.end();

// const generateAdress = () => {
//   console.log(faker.location.streetAddress());
//   console.log(faker.location.city());
//   console.log(faker.location.state());
// };

// generateAdress();
// Inserting DATA 3

app.listen(8000, function () {
  console.log('Server running on 8000!');
});
