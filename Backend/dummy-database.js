import admin from "./admin.json" with { type: "json" };
import * as authentication from "./dummy-database/authentication.js";
import * as account from "./dummy-database/account.js";

export const info = "Dummy Database";

let tables = {
  users: [admin],
  quoteRequests: [],
  quoteResponses: [],
  quoteRequestRevisions: [],
  quoteResponseRevisions: [],
  workOrders: [],
  billRequests: [],
  billResponses: [],
  billRequestRevisions: [],
  billResponseRevisions: []
}

export async function register(user) {
  return authentication.register(tables, user)
}

export async function login(username, password) {
  return authentication.login(tables, username, password);
}

export async function getAccount(username, password) {
  return account.getAccount(tables, username, password);
}