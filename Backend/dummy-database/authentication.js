import * as cryptography from "../utils/cryptography.js";
import * as time from "../utils/time.js";
import * as account from "./account.js";

export async function register(tables, user) {
  if (tables.users.find((value) => value.username == user.username)) {
    throw new Error(
      "Registering failed. User already exists with given username."
    );
  }

  const userData = {
    id: tables.users.length + 1,
    username: user.username,
    password: cryptography.hash(user.password),
    street: user.street,
    city: user.city,
    state: user.state,
    zipCode: user.zipCode,
    country: user.country,
    cardNumber: user.cardNumber,
    firstname: user.firstname,
    lastname: user.lastname,
    phoneNumber: user.phoneNumber,
    email: user.email,
    registerTime: time.getTime(),
    loginTime: null,
    admin: 0,
  };

  for (const key in userData) {
    userData[key] = userData[key] ?? null;
  }

  tables.users.push(userData);

  return userData;
}

export async function login(tables, username, password) {
  const user = account.getAccount(tables, username, password);

  if (!user.registerTime) {
    user.registerTime = time.getTime();
  }

  user.loginTime = time.getTime();

  return user;
}
