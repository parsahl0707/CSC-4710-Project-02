import * as account from "./account.js";
import * as quotes from "./quotes.js";
import * as time from "../utils/time.js";

export async function getWorkOrders(connection, username, password) {
  const user = await account.getAccount(connection, username, password);

  const query =
    "SELECT * FROM WorkOrders " + (user.admin == 1 ? "" : "WHERE userId = ?;");
  const parameters = [user.id];
  const result = await connection.query(query, parameters);

  return result;
}

export async function postWorkOrder(
  connection,
  username,
  password,
  quoteRequestId
) {
  const user = await account.getAccount(connection, username, password);

  const quoteRequest = (
    await quotes.getQuoteRequests(connection, username, password)
  ).find((quoteRequest) => quoteRequest.id == quoteRequestId);

  if (!quoteRequest) {
    throw new Error("Quote request not found with given ID.");
  }

  if (!user.admin && !quoteRequest.userId == user.id) {
    throw new Error("User is not authorized");
  }

  if (
    quoteRequest.status == "pending" ||
    quoteRequest.status == "negotiating"
  ) {
    throw new Error(`Quote request still ${quoteRequest.status}`);
  }

  const quoteResponse = (
    await quotes.getQuoteResponses(connection, username, password)
  ).find((quoteResponse) => quoteResponse.id == quoteRequest.quoteResponseId);

  if (!quoteResponse) {
    throw new Error("Quote request not found with given ID.");
  }

  const quoteResponseRevision = (
    await quotes.getQuoteResponseRevisions(connection, username, password)
  ).find(
    (quoteResponseRevision) =>
      quoteResponseRevision.id == quoteResponse.quoteResponseRevisionId
  );

  const currentQuoteResponseRevision = !quoteResponseRevision
    ? quoteResponse
    : quoteResponseRevision;

  const query1 =
    "INSERT INTO WorkOrders \
  (userId, quoteRequestId, price, \
  startDate, endDate, status, createdAt) \
  VALUES (?, ?, ?, ?, ?, ?, ?);";
  const parameters1 = [
    quoteRequest.userId,
    currentQuoteResponseRevision.quoteRequestId,
    currentQuoteResponseRevision.proposedPrice,
    currentQuoteResponseRevision.startDate,
    currentQuoteResponseRevision.endDate,
    "pending",
    time.getTime(),
  ];
  const result1 = await connection.query(query1, parameters1);

  const query2 = "SELECT * FROM QuoteRequests WHERE id = ?;";
  const parameters2 = [result1.insertId];
  const result2 = await connection.query(query2, parameters2);

  return result2[0];
}

// Largest Driveway Work Orders
export async function getLargestDrivewayWorkOrders(
  connection,
  username,
  password
) {
  const user = await account.getAccount(connection, username, password);

  const query =
    "WITH WorkOrdersWithDriveway AS ( \
      SELECT WorkOrders.*, QuoteRequests.drivewaySize FROM WorkOrders \
      JOIN QuoteRequests ON WorkOrders.quoteRequestId = QuoteRequests.id \
    ), \
    MaxDrivewaySize AS ( \
      SELECT MAX(drivewaySize) AS maxSize \
      FROM WorkOrdersWithDriveway \
    ) \
    SELECT * FROM WorkOrdersWithDriveway \
    WHERE drivewaySize = (SELECT maxSize FROM MaxDrivewaySize);";
  const result = connection.query(query);

  return result;
}
