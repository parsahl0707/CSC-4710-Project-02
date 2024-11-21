import crypto from "crypto";

const date = new Date();

export function hash(password) {
  return crypto.createHash("sha256").update(password).digest("hex");
}

export function getTime() {
  return date.toISOString().slice(0, 19).replace("T", " ");
}

export function getCredentialsFromAuthHeaders(authHeader) {
  if (!authHeader) {
    return [null, null];
  }

  const base64Credentials = authHeader.split(" ")[1];

  const credentials = Buffer.from(base64Credentials, "base64")
    .toString("utf-8")
    .split(":");

  return credentials;
}

export function getUserDataFromUser(user) {
  const userData = {
    username: user.username,
    password: hash(user.password),
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
    registerTime: getTime(),
    loginTime: null,
    admin: 0,
  };

  return userData;
}
