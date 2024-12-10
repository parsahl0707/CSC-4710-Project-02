import * as account from "./account.js";
import * as workOrders from "./work-orders.js";
import * as time from "../utils/time.js";
import * as cryptography from "../utils/cryptography.js";

// Quote Requests
export async function getQuoteRequests(connection, username, password) {
  const user = await account.getAccount(connection, username, password);

  const query =
    "SELECT * FROM QuoteRequests" +
    (user.admin == 1 ? ";" : " WHERE userId = ?;");
  const parameters = [user.id];
  const result = await connection.query(query, parameters);

  return result;
}

export async function postQuoteRequest(
  connection,
  username,
  password,
  quoteRequest
) {
  const user = await account.getAccount(connection, username, password);

  const query1 =
    "INSERT INTO QuoteRequests \
            (userId, street, city, state, \
            zipCode, country, drivewaySize, proposedPrice, \
            imageUrl1, imageUrl2, imageUrl3, imageUrl4, imageUrl5, \
            note, status, createdAt) \
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
  const parameters1 = [
    user.id,
    quoteRequest.street,
    quoteRequest.city,
    quoteRequest.state,
    quoteRequest.zipCode,
    quoteRequest.country,
    quoteRequest.drivewaySize,
    quoteRequest.proposedPrice,
    quoteRequest.imageUrl1,
    quoteRequest.imageUrl2,
    quoteRequest.imageUrl3,
    quoteRequest.imageUrl4,
    quoteRequest.imageUrl5,
    quoteRequest.note,
    "pending",
    time.getTime(),
  ];
  const result1 = await connection.query(query1, parameters1);

  const query2 = "SELECT * FROM QuoteRequests WHERE id = ?;";
  const parameters2 = [result1.insertId];
  const result2 = await connection.query(query2, parameters2);

  return result2[0];
}

// Quote Responses
export async function getQuoteResponses(connection, username, password) {
  const user = await account.getAccount(connection, username, password);

  const query =
    "SELECT * FROM QuoteResponses" +
    (user.admin == 1 ? ";" : " WHERE userId = ?;");
  const parameters = [user.id];
  const result = await connection.query(query, parameters);

  return result;
}

export async function postQuoteResponse(
  connection,
  username,
  password,
  quoteResponse
) {
  const user = await account.getAccount(connection, username, password);

  if (!user.admin) {
    throw new Error("User is not admin");
  }

  const quoteRequest = (
    await getQuoteRequests(connection, username, password)
  ).find((quoteRequest) => quoteRequest.id == quoteResponse.quoteRequestId);

  if (!quoteRequest) {
    throw new Error("Quote request not found with given ID.");
  }

  if (!!quoteRequest.quoteResponseId) {
    throw new Error("Quote request already has quote response.");
  }

  const query1 =
    "INSERT INTO QuoteResponses \
                  (userId, quoteRequestId, rejected, proposedPrice, \
                  startDate, endDate, note, createdAt) \
                  VALUES (?, ?, ?, ?, ?, ?, ?, ?);";
  const parameters1 = [
    quoteRequest.userId,
    quoteResponse.quoteRequestId,
    quoteResponse.rejected,
    quoteResponse.proposedPrice,
    quoteResponse.startDate,
    quoteResponse.endDate,
    quoteResponse.note,
    time.getTime(),
  ];
  const result1 = await connection.query(query1, parameters1);

  const query2 = "SELECT * FROM QuoteResponses WHERE id = ?;";
  const parameters2 = [result1.insertId];
  const result2 = await connection.query(query2, parameters2);

  const query3 =
    "UPDATE QuoteRequests SET quoteResponseId = ?, status = ? WHERE id = ?;";
  const parameters3 = [
    result1.insertId,
    quoteResponse.rejected ? "rejected" : "negotiating",
    quoteResponse.quoteRequestId,
  ];
  await connection.query(query3, parameters3);

  return result2[0];
}

// Quote Request Revisions
export async function getQuoteRequestRevisions(connection, username, password) {
  const user = await account.getAccount(connection, username, password);

  const query =
    "SELECT * FROM QuoteRequestRevisions" +
    (user.admin == 1 ? ";" : " WHERE userId = ?;");
  const parameters = [user.id];
  const result = await connection.query(query, parameters);

  return result;
}

export async function postQuoteRequestRevision(
  connection,
  username,
  password,
  quoteRequestRevision
) {
  const user = await account.getAccount(connection, username, password);

  const quoteRequest = (
    await getQuoteRequests(connection, username, password)
  ).find(
    (quoteRequest) => quoteRequest.id == quoteRequestRevision.quoteRequestId
  );

  if (!quoteRequest) {
    throw new Error("Quote request not found with given ID.");
  }

  if (quoteRequest.userId != user.id) {
    throw new Error("User cannot revise another users request.");
  }

  if (!quoteRequest.quoteResponseId) {
    throw new Error("Quote request has no response");
  }

  if (quoteRequest.status == "rejected" || quoteRequest.status == "accepted") {
    throw new Error("Quote request already rejected or accepted.");
  }

  const query1 =
    "INSERT INTO QuoteRequestRevisions \
                          (userId, quoteRequestId, accepted, note, createdAt) \
                          VALUES (?, ?, ?, ?, ?);";
  const parameters1 = [
    quoteRequest.userId,
    quoteRequestRevision.quoteRequestId,
    quoteRequestRevision.accepted,
    quoteRequestRevision.note,
    time.getTime(),
  ];
  const result1 = await connection.query(query1, parameters1);

  const query2 = "SELECT * FROM QuoteRequestRevisions WHERE id = ?;";
  const parameters2 = [result1.insertId];
  const result2 = await connection.query(query2, parameters2);

  const query3 =
    "UPDATE QuoteRequests SET quoteRequestRevisionId = ?, status = ? WHERE id = ?;";
  const parameters3 = [
    result1.insertId,
    quoteRequestRevision.accepted ? "accepted" : "negotiating",
    quoteRequestRevision.quoteRequestId,
  ];
  await connection.query(query3, parameters3);

  if (quoteRequestRevision.accepted) {
    workOrders.postWorkOrder(
      connection,
      username,
      password,
      quoteRequestRevision.quoteRequestId
    );
  }

  return result2[0];
}

// Quote Response Revisions
export async function getQuoteResponseRevisions(
  connection,
  username,
  password
) {
  const user = await account.getAccount(connection, username, password);

  const query =
    "SELECT * FROM QuoteResponseRevisions" +
    (user.admin == 1 ? ";" : " WHERE userId = ?;");
  const parameters = [user.id];
  const result = await connection.query(query, parameters);

  return result;
}

export async function postQuoteResponseRevision(
  connection,
  username,
  password,
  quoteResponseRevision
) {
  const user = await account.getAccount(connection, username, password);

  if (!user.admin) {
    throw new Error("User is not admin");
  }

  const quoteResponse = (
    await getQuoteResponses(connection, username, password)
  ).find(
    (quoteResponse) => quoteResponse.id == quoteResponseRevision.quoteResponseId
  );

  if (!quoteResponse) {
    throw new Error("Quote response not found with given ID.");
  }

  const quoteRequest = (
    await getQuoteRequests(connection, username, password)
  ).find((value) => value.id == quoteResponse.quoteRequestId);

  if (!quoteRequest) {
    throw new Error("Quote request not found with given ID.");
  }

  if (quoteRequest.status == "rejected" || quoteRequest.status == "accepted") {
    throw new Error("Quote request already rejected or accepted.");
  }

  const query1 =
    "INSERT INTO QuoteResponseRevisions \
                              (userId, quoteResponseId, rejected, proposedPrice, \
                              startDate, endDate, note, createdAt) \
                              VALUES (?, ?, ?, ?, ?, ?, ?, ?);";
  const parameters1 = [
    quoteResponse.userId,
    quoteResponseRevision.quoteResponseId,
    quoteResponseRevision.rejected,
    quoteResponseRevision.proposedPrice,
    quoteResponseRevision.startDate,
    quoteResponseRevision.endDate,
    quoteResponseRevision.note,
    time.getTime(),
  ];
  const result1 = await connection.query(query1, parameters1);

  const query2 = "SELECT * FROM QuoteResponseRevisions WHERE id = ?;";
  const parameters2 = [result1.insertId];
  const result2 = await connection.query(query2, parameters2);

  const query3 =
    "UPDATE QuoteResponses SET " +
    (!quoteResponseRevision.rejected ? "" : "status = 'rejected' ") +
    "quoteResponseRevisionId = ? WHERE id = ?;";
  const parameters3 = [result1.insertId, quoteResponseRevision.quoteResponseId];
  await connection.query(query3, parameters3);

  return result2[0];
}
