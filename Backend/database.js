const crypto = require("crypto");
const mysql = require("mysql");
const dotenv = require("dotenv");
dotenv.config();

const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.DB_USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: process.env.DB_PORT,
});

connection.connect((error) => {
  if (error) {
    console.log(error.message);
  }

  console.log("Database status: " + connection.state);
});
