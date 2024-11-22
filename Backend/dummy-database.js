import admin from "./admin.json" with { type: "json" };
import * as utils from "./utils.js";

export const info = "Dummy Database";

let users = [admin];

export async function register(user) {
  const userData = {
    id: users.length + 1,
    ...utils.getUserDataFromUser(user),
  };

  users.push(userData);

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

  if (!user.registerTime) {
    user.registerTime = utils.getTime();
  }

  user.loginTime = utils.getTime();

  return user;
}

export async function account(username, password) {
  const user = users.find(
    (value) =>
      value.username === username && value.password === utils.hash(password)
  );

  if (!user) {
    throw new Error("Login failed. Invalid credentials.");
  }

  return user;
}
