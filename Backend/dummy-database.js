import admin from "./admin.json" with { type: "json" };
import * as authentication from "./dummy-database/authentication.js";
import * as account from "./dummy-database/account.js";
import * as quotes from "./dummy-database/quotes.js"

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

// Authentication
export async function register(user) {
  return authentication.register(tables, user)
}

export async function login(username, password) {
  return authentication.login(tables, username, password);
}

// Account
export async function getAccount(username, password) {
  return account.getAccount(tables, username, password);
}

// Quotes
export async function getQuoteRequests(username, password) {
  return quotes.getQuoteRequests(tables, username, password)
}

export async function postQuoteRequests(username, password, quote) {
  return quotes.postQuoteRequests(tables, username, password, quote)
}