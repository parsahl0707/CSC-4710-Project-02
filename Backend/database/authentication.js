import admin from "../admin.json" with { type: "json" };
import * as cryptography from "../utils/cryptography.js";
import * as time from "../utils/time.js";
import * as account from "./account.js";

export async function registerAdmin(connection) {
  try {
    await account.getAccount(connection, "admin", "admin");
  } catch {
    const query1 =
      "INSERT INTO Users \
          (username, password, street, city, state, \
          zipCode, country, cardNumber, firstname, lastname, \
          phoneNumber, email, registerTime, loginTime, admin) \
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
    const parameters1 = [
      admin.username,
      cryptography.hash(admin.password),
      admin.street,
      admin.city,
      admin.state,
      admin.zipCode,
      admin.country,
      admin.cardNumber,
      admin.firstname,
      admin.lastname,
      admin.phoneNumber,
      admin.email,
      time.getTime(),
      null,
      1,
    ];
    const result1 = await connection.query(query1, parameters1);

    const query2 = "SELECT * FROM QuoteRequests WHERE id = ?;";
    const parameters2 = [result1.insertId];
    const result2 = await connection.query(query2, parameters2);

    return result2[0];
  }
}

export async function register(connection, user) {
  const query1 =
    "INSERT INTO Users \
      (username, password, street, city, state, \
      zipCode, country, cardNumber, firstname, lastname, \
      phoneNumber, email, registerTime, loginTime, admin) \
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
  const parameters1 = [
    user.username,
    cryptography.hash(user.password),
    user.street,
    user.city,
    user.state,
    user.zipCode,
    user.country,
    user.cardNumber,
    user.firstname,
    user.lastname,
    user.phoneNumber,
    user.email,
    time.getTime(),
    null,
    0,
  ];
  const result1 = await connection.query(query1, parameters1);

  const query2 = "SELECT * FROM Users WHERE id = ?;";
  const parameters2 = [result1.insertId];
  const result2 = await connection.query(query2, parameters2);

  return result2[0];
}

export async function login(connection, username, password) {
  const query1 =
    "UPDATE Users SET loginTime = ? WHERE username = ? AND password = ?;";
  const parameters1 = [time.getTime(), username, cryptography.hash(password)];
  await connection.query(query1, parameters1);

  return account.getAccount(connection, username, password)
}
