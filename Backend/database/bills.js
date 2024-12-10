import * as account from "./account.js";
import * as workOrders from "./work-orders.js";
import * as time from "../utils/time.js";

// Bill Requests
export async function getBillRequests(connection, username, password) {
  const user = await account.getAccount(connection, username, password);

  const query =
    "SELECT * FROM BillRequests" +
    (user.admin == 1 ? ";" : " WHERE userId = ?;");
  const parameters = [user.id];
  const result = await connection.query(query, parameters);

  return result;
}

export async function postBillRequest(
  connection,
  username,
  password,
  billRequest
) {
  const user = await account.getAccount(connection, username, password);

  if (!user.admin) {
    throw new Error("User is not admin");
  }

  const workOrder = (
    await workOrders.getWorkOrders(connection, username, password)
  ).find((workOrder) => workOrder.id == billRequest.workOrderId);

  if (!workOrder) {
    throw new Error("Work order not found with given ID.");
  }

  const query1 =
    "INSERT INTO BillRequests \
            (userId, workOrderId, price, \
            status, createdAt) \
            VALUES (?, ?, ?, ?, ?);";
  const parameters1 = [
    workOrder.userId,
    billRequest.workOrderId,
    billRequest.price,
    "pending",
    time.getTime(),
  ];
  const result1 = await connection.query(query1, parameters1);

  const query2 = "SELECT * FROM BillRequests WHERE id = ?;";
  const parameters2 = [result1.insertId];
  const result2 = await connection.query(query2, parameters2);

  const query3 = "UPDATE WorkOrders SET status = 'completed' WHERE id = ?;";
  const parameters3 = [workOrder.id];
  await connection.query(query3, parameters3);

  return result2[0];
}

// Bill Responses
export async function getBillResponses(connection, username, password) {
  const user = await account.getAccount(connection, username, password);

  const query =
    "SELECT * FROM BillResponses" +
    (user.admin == 1 ? ";" : " WHERE userId = ?;");
  const parameters = [user.id];
  const result = await connection.query(query, parameters);

  return result;
}

export async function postBillResponse(
  connection,
  username,
  password,
  billResponse
) {
  const user = await account.getAccount(connection, username, password);

  const billRequest = (
    await getBillRequests(connection, username, password)
  ).find((billRequest) => billRequest.id == billResponse.billRequestId);

  if (!billRequest) {
    throw new Error("Bill request not found with given ID.");
  }

  if (!!billRequest.billResponseId) {
    throw new Error("Bill request already has bill response.");
  }

  const query1 =
    "INSERT INTO BillResponses \
                  (userId, billRequestId, disputed,  \
                  cardNumber, note, createdAt) \
                  VALUES (?, ?, ?, ?, ?, ?);";
  const parameters1 = [
    user.id,
    billResponse.billRequestId,
    billResponse.disputed,
    billResponse.cardNumber,
    billResponse.note,
    time.getTime(),
  ];
  const result1 = await connection.query(query1, parameters1);

  const query2 = "SELECT * FROM BillResponses WHERE id = ?;";
  const parameters2 = [result1.insertId];
  const result2 = await connection.query(query2, parameters2);

  const query3 =
    "UPDATE BillRequests SET billResponseId = ?, status = ? WHERE id = ?;";
  const parameters3 = [
    result1.insertId,
    billResponse.disputed ? "disputed" : "paid",
    billRequest.id,
  ];
  await connection.query(query3, parameters3);

  if (!billResponse.disputed) {
    const query4 = "UPDATE BillRequests SET paidAt = ? WHERE id = ?;";
    const parameters4 = [time.getTime(), billRequest.id];
    await connection.query(query4, parameters4);
  }

  return result2[0];
}

// Bill Request Revisions
export async function getBillRequestRevisions(connection, username, password) {
  const user = await account.getAccount(connection, username, password);

  const query =
    "SELECT * FROM BillRequestRevisions" +
    (user.admin == 1 ? ";" : " WHERE userId = ?;");
  const parameters = [user.id];
  const result = await connection.query(query, parameters);

  return result;
}

export async function postBillRequestRevision(
  connection,
  username,
  password,
  billRequestRevision
) {
  const user = await account.getAccount(connection, username, password);

  const billRequest = (
    await getBillRequests(connection, username, password)
  ).find((billRequest) => billRequest.id == billRequestRevision.billRequestId);

  if (!billRequest) {
    throw new Error("Bill request not found with given ID.");
  }

  const query1 =
    "INSERT INTO BillRequestRevisions \
                          (userId, billRequestId, price, note, createdAt) \
                          VALUES (?, ?, ?, ?, ?);";
  const parameters1 = [
    billRequest.userId,
    billRequestRevision.billRequestId,
    billRequestRevision.price,
    billRequestRevision.note,
    time.getTime(),
  ];
  const result1 = await connection.query(query1, parameters1);

  const query2 = "SELECT * FROM BillRequestRevisions WHERE id = ?;";
  const parameters2 = [result1.insertId];
  const result2 = await connection.query(query2, parameters2);

  const query3 =
    "UPDATE BillRequests SET billRequestRevisionId = ? WHERE id = ?;";
  const parameters3 = [result1.insertId, billRequestRevision.billRequestId];
  await connection.query(query3, parameters3);

  return result2[0];
}

// Bill Response Revisions
export async function getBillResponseRevisions(connection, username, password) {
  const user = await account.getAccount(connection, username, password);

  const query =
    "SELECT * FROM BillResponseRevisions" +
    (user.admin == 1 ? ";" : " WHERE userId = ?;");
  const parameters = [user.id];
  const result = await connection.query(query, parameters);

  return result;
}

export async function postBillResponseRevision(
  connection,
  username,
  password,
  billResponseRevision
) {
  const user = await account.getAccount(connection, username, password);

  const billResponse = (
    await getBillResponses(connection, username, password)
  ).find(
    (billResponse) => billResponse.id == billResponseRevision.billResponseId
  );

  if (!billResponse) {
    throw new Error("Bill response not found with given ID.");
  }

  const billRequest = (
    await getBillRequests(connection, username, password)
  ).find((billRequest) => billRequest.id == billResponse.billRequestId);

  if (!billRequest) {
    throw new Error("Bill request not found with given ID.");
  }

  if (billRequest.status == "paid") {
    throw new Error("Bill request already paid for.");
  }

  const query1 =
    "INSERT INTO BillResponseRevisions \
                              (userId, billResponseId, disputed, \
                              cardNumber, note, createdAt) \
                              VALUES (?, ?, ?, ?, ?, ?);";
  const parameters1 = [
    billResponse.userId,
    billResponseRevision.billResponseId,
    billResponseRevision.disputed,
    billResponseRevision.cardNumber,
    billResponseRevision.note,
    time.getTime(),
  ];
  const result1 = await connection.query(query1, parameters1);

  const query2 = "SELECT * FROM BillResponseRevisions WHERE id = ?;";
  const parameters2 = [result1.insertId];
  const result2 = await connection.query(query2, parameters2);

  const query3 =
    "UPDATE BillResponses SET billResponseRevisionId = ? \
  WHERE id = ?;";
  const parameters3 = [result1.insertId, billResponse.id];
  await connection.query(query3, parameters3);

  const query4 =
    "UPDATE BillRequests SET status = ? \
      WHERE id = ?;";
  const parameters4 = [
    billResponseRevision.disputed ? "disputed" : "paid",
    billRequest.id,
  ];
  await connection.query(query4, parameters4);

  if (!billResponseRevision.disputed) {
    const query5 =
      "UPDATE BillRequests SET paidAt = ? \
      WHERE id = ?;";
    const parameters5 = [time.getTime(), billRequest.id];
    await connection.query(query5, parameters5);
  }

  return result2[0];
}

// Overdue Bills
export async function getOverdueBills(connection, username, password) {
  const user = await account.getAccount(connection, username, password);

  const overdueBills = (
    await getBillRequests(connection, username, password)
  ).filter(
    (billRequest) =>
      (billRequest.status == "paid" ? billRequest.paidAt : time.getTime()) >
      time.getWeekAfterDate(billRequest.createdAt)
  );

  return overdueBills;
}
