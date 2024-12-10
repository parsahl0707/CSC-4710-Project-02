import * as cryptography from "../utils/cryptography.js";
import * as time from "../utils/time.js";

export async function getAccount(connection, username, password) {
  const query = "SELECT * FROM Users WHERE username = ? AND password = ?;";
  const parameters = [username, cryptography.hash(password)];
  const result = await connection.query(query, parameters);

  if (!result[0]) {
    throw new Error("Invalid credentials");
  }

  return result[0];
}
