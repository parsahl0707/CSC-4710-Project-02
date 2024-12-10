import * as authentication from "./dummy-database/authentication.js";
import * as account from "./dummy-database/account.js";
import * as quotes from "./dummy-database/quotes.js";
import * as workOrders from "./dummy-database/work-orders.js";
import * as bills from "./dummy-database/bills.js";

export const info = "Dummy Database";

let tables = {
  users: [],
  quoteRequests: [],
  quoteResponses: [],
  quoteRequestRevisions: [],
  quoteResponseRevisions: [],
  workOrders: [],
  billRequests: [],
  billResponses: [],
  billRequestRevisions: [],
  billResponseRevisions: [],
};

export async function initialize() {
  console.log("Initializing Database");
  return authentication.registerAdmin(tables);
}

// Authentication
export async function register(user) {
  return authentication.register(tables, user);
}

export async function login(username, password) {
  return authentication.login(tables, username, password);
}

// Account
export async function getAccount(username, password) {
  return account.getAccount(tables, username, password);
}

export async function getAllAccounts(username, password) {
  return account.getAllAccounts(tables, username, password);
}

// Biggest Clients
export async function getBiggestClients(username, password) {
  return account.getBiggestClients(tables, username, password);
}

// Difficult Clients
export async function getDifficultClients(username, password) {
  return account.getDifficultClients(tables, username, password);
}

// Prospective Clients
export async function getProspectiveClients(username, password) {
  return account.getProspectiveClients(tables, username, password);
}

// Good Clients
export async function getGoodClients(username, password) {
  return account.getGoodClients(tables, username, password);
}

// Bad Clients
export async function getBadClients(username, password) {
  return account.getBadClients(tables, username, password);
}

// Quote Requests
export async function getQuoteRequests(username, password) {
  return quotes.getQuoteRequests(tables, username, password);
}

export async function postQuoteRequest(username, password, quoteRequest) {
  return quotes.postQuoteRequest(tables, username, password, quoteRequest);
}

// Quote Responses
export async function getQuoteResponses(username, password) {
  return quotes.getQuoteResponses(tables, username, password);
}

export async function postQuoteResponse(username, password, quoteResponse) {
  return quotes.postQuoteResponse(tables, username, password, quoteResponse);
}

// Quote Request Revisions
export async function getQuoteRequestRevisions(username, password) {
  return quotes.getQuoteRequestRevisions(tables, username, password);
}

export async function postQuoteRequestRevision(
  username,
  password,
  quoteRequestRevision
) {
  return quotes.postQuoteRequestRevision(
    tables,
    username,
    password,
    quoteRequestRevision
  );
}

// Quote Response Revisions
export async function getQuoteResponseRevisions(username, password) {
  return quotes.getQuoteResponseRevisions(tables, username, password);
}

export async function postQuoteResponseRevision(
  username,
  password,
  quoteResponseRevision
) {
  return quotes.postQuoteResponseRevision(
    tables,
    username,
    password,
    quoteResponseRevision
  );
}

// Agreed Quotes
export async function getAgreedQuotes(username, password) {
  return quotes.getAgreedQuotes(tables, username, password);
}

// Work Orders
export async function getWorkOrders(username, password) {
  return workOrders.getWorkOrders(tables, username, password);
}

// Largest Driveway Work Orders
export async function getLargestDrivewayWorkOrders(username, password) {
  return workOrders.getLargestDrivewayWorkOrders(tables, username, password);
}

// Bill Requests
export async function getBillRequests(username, password) {
  return bills.getBillRequests(tables, username, password);
}

export async function postBillRequest(username, password, billRequest) {
  return bills.postBillRequest(tables, username, password, billRequest);
}

// Bill Responses
export async function getBillResponses(username, password) {
  return bills.getBillResponses(tables, username, password);
}

export async function postBillResponse(username, password, billResponse) {
  return bills.postBillResponse(tables, username, password, billResponse);
}

// Bill Request Revisions
export async function getBillRequestRevisions(username, password) {
  return bills.getBillRequestRevisions(tables, username, password);
}

export async function postBillRequestRevision(
  username,
  password,
  billRequestRevision
) {
  return bills.postBillRequestRevision(
    tables,
    username,
    password,
    billRequestRevision
  );
}

// Bill Response Revisions
export async function getBillResponseRevisions(username, password) {
  return bills.getBillResponseRevisions(tables, username, password);
}

export async function postBillResponseRevision(
  username,
  password,
  billResponseRevision
) {
  return bills.postBillResponseRevision(
    tables,
    username,
    password,
    billResponseRevision
  );
}

// Overdue Bills
export async function getOverdueBills(username, password) {
  return bills.getOverdueBills(tables, username, password);
}

// Revenue

export async function getRevenue(username, password, date) {
  return bills.getRevenue(tables, username, password, date);
}
