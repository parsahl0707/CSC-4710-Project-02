import * as utils from "../utils/utils.js";
import * as cryptography from "../utils/cryptography.js";
import * as time from "../utils/time.js";

export async function register(tables, user) {
  if (tables.users.find((value) => value.username == user.username)) {
    throw new Error(
      "Registering failed. User already exists with given username."
    );
  }

  const userData = {
    id: tables.users.length + 1,
    ...utils.getUserDataFromUser(user),
  };

  tables.users.push(userData);

  return userData;
}

export async function login(tables, username, password) {
  if (username == null || password == null) {
    throw new Error("Login failed. Credentials not provided.");
  }

  const user = tables.users.find(
    (value) =>
      value.username === username &&
      value.password === cryptography.hash(password)
  );

  if (!user) {
    throw new Error("Login failed. Invalid credentials.");
  }

  if (!user.registerTime) {
    user.registerTime = time.getTime();
  }

  user.loginTime = time.getTime();

  return user;
}

export async function getAccount(username, password) {
  if (username == null || password == null) {
    throw new Error("Retrieving account failed. Credentials not provided.");
  }

  const user = tables.users.find(
    (value) =>
      value.username === username && value.password === utils.hash(password)
  );

  if (!user) {
    throw new Error("Retrieving account failed. Invalid credentials.");
  }

  return user;
}
