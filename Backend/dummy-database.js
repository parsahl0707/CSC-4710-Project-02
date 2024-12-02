import users from "./users.json" with { type: "json" };
import * as authentication from "./dummy-database/authentication.js";
import * as account from "./dummy-database/account.js";
import * as quotes from "./dummy-database/quotes.js"

export const info = "Dummy Database";

let tables = {
  users: users,
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

// Quote Requests
export async function getQuoteRequests(username, password) {
  return quotes.getQuoteRequests(tables, username, password)
}

export async function postQuoteRequest(username, password, quoteRequest) {
  return quotes.postQuoteRequest(tables, username, password, quoteRequest)
}

// Quote Responses
export async function getQuoteResponses(username, password) {
  return quotes.getQuoteResponses(tables, username, password)
}

export async function postQuoteResponse(username, password, quoteResponse) {
  return quotes.postQuoteResponse(tables, username, password, quoteResponse)
}

// Quote Request Revisions
export async function getQuoteRequestRevisions(username, password) {
  return quotes.getQuoteRequestRevisions(tables, username, password)
}

export async function postQuoteRequestRevision(username, password, quoteRequestRevision) {
  return quotes.postQuoteRequestRevision(tables, username, password, quoteRequestRevision)
}

// Quote Response Revisions
export async function getQuoteResponseRevisions(username, password) {
  return quotes.getQuoteResponseRevisions(tables, username, password)
}

export async function postQuoteResponseRevision(username, password, quoteResponseRevision) {
  return quotes.postQuoteResponseRevision(tables, username, password, quoteResponseRevision)
}