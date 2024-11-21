import * as utils from "./utils.js";

export const info = "Dummy Database";

let users = [];

export async function register(user) {
  const userData = utils.getUserDataFromUser(user);

  users.push({ id: length(users) + 1, ...userData });

  return userData;
}

export async function login(username, password) {
  const user = users.find(
    (value) =>
      value.username === username && value.password === utils.hash(password)
  );

  if (!user) {
    throw new Error("Login failed. Invalid credentials.");
  }

  user.loginTime = utils.getTime();

  return user;
}
