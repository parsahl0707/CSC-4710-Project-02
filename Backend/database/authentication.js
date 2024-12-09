import * as cryptography from "../utils/cryptography.js";
import * as time from "../utils/time.js";
import * as account from "./account.js";

export async function register(user) {
  const response = await new Promise((resolve, reject) => {
    const query =
      "INSERT INTO Users VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";

    connection.query(
      query,
      [
        user.username,
        user.password,
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

  return userData;
}

export async function login(username, password) {
  const response = await new Promise((resolve, reject) => {
    const query =
      "SELECT * FROM Users WHERE username = ? AND password = ?; \
      UPDATE Users SET loginTime = ? WHERE username = ? AND password = ?;";

    connection.query(
      query,
      [username, password, time.getTime(), username, password],
      (err, results) => {
        if (err) reject(new Error(err.message));
        else resolve(results);
      }
    );
  });

  return response;
}
