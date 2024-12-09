import * as cryptography from "../utils/cryptography.js";
import * as time from "../utils/time.js";
import * as account from "./account.js";

export async function registerAdmin(connection) {
  account.getAccount(connection, "admin", "admin").then((user) => {
    if (!!user) {
      return;
    }

    const response = new Promise((resolve, reject) => {
      const query =
        "INSERT INTO Users \
          (username, password, street, city, state, \
          zipCode, country, cardNumber, firstname, lastname, \
          phoneNumber, email, registerTime, loginTime, admin) \
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";

      connection.query(
        query,
        [
          "admin",
          cryptography.hash("admin"),
          null,
          null,
          null,
          null,
          null,
          null,
          "David",
          "Smith",
          null,
          null,
          time.getTime(),
          null,
          1,
        ],
        (err, result) => {
          if (err) reject(new Error(err.message));
          else resolve(result);
        }
      );
    });

    return response;
  });
}

export async function register(connection, user) {
  const response = await new Promise((resolve, reject) => {
    const query =
      "INSERT INTO Users \
      (username, password, street, city, state, \
      zipCode, country, cardNumber, firstname, lastname, \
      phoneNumber, email, registerTime, loginTime, admin) \
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";

    connection.query(
      query,
      [
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
      ],
      (err, result) => {
        if (err) reject(new Error(err.message));
        else resolve(result);
      }
    );
  });

  return response;
}

export async function login(connection, username, password) {
  await new Promise((resolve, reject) => {
    const query =
      "UPDATE Users SET loginTime = ? WHERE username = ? AND password = ?;";

    connection.query(
      query,
      [time.getTime(), username, cryptography.hash(password)],
      (err, results) => {
        if (err) reject(new Error(err.message));
        else resolve(results);
      }
    );
  });

  return account.getAccount(connection, username, password);
}
