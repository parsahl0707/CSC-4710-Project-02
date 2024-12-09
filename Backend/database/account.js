import * as cryptography from "../utils/cryptography.js";
import * as time from "../utils/time.js";

export async function getAccount(username, password) {
  const response = await new Promise((resolve, reject) => {
    const query = "SELECT * FROM Users WHERE username = ? AND password = ?;";

    connection.query(
      query,
      [username, cryptography.hash(password)],
      (err, results) => {
        if (err) reject(new Error(err.message));
        else resolve(results);
      }
    );
  });

  return response;
}
