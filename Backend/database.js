import mysql from "mysql";
import dotenv from "dotenv";

import * as utils from "./utils.js";

dotenv.config();

const connectionData = {
  host: process.env.HOST,
  user: process.env.DB_USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: process.env.DB_PORT,
};

const connection = mysql.createConnection(connectionData);

export const info = "MySQL Database - " + JSON.stringify(connectionData);

connection.connect((error) => {
  if (error) {
    console.log(error.message);
  }

  console.log("Database status: " + connection.state);
});

export async function register(user) {
  const userData = utils.getUserDataFromUser(user);

  const response = await new Promise((resolve, reject) => {
    const query =
      "INSERT INTO Users VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";

    connection.query(query, Object.values(userData), (err, result) => {
      if (err) reject(new Error(err.message));
      else resolve(result);
    });
  });

  console.log(response); // TESTING

  return userData;
}

export async function login(username, password) {
  const response = await new Promise((resolve, reject) => {
    const query = "SELECT * FROM Users WHERE username = ? AND password = ?;";

    connection.query(
      query,
      [username, utils.hash(password)],
      (err, results) => {
        if (err) reject(new Error(err.message));
        else resolve(results);
      }
    );
  });

  return response;
}
