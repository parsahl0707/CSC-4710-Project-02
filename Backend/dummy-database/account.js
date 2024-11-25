import * as cryptography from "../utils/cryptography.js";

export async function getAccount(tables, username, password) {
  if (username == null || password == null) {
    throw new Error("Retrieving account failed. Credentials not provided.");
  }

  const user = tables.users.find(
    (value) =>
      value.username === username &&
      value.password === cryptography.hash(password)
  );

  if (!user) {
    throw new Error("Retrieving account failed. Invalid credentials.");
  }

  return user;
}
