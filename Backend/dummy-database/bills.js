import * as account from "./account.js";
import * as time from "../utils/time.js";

// Bill Requests
export async function getBillRequests(tables, username, password) {
  return account.getAccount(tables, username, password).then((user) => {
    if (user.admin) {
      return tables.billRequests;
    }

    return tables.billRequests.filter((value) => value.userId === user.id);
  });
}

export async function postBillRequest(tables, username, password, billRequest) {
  return account.getAccount(tables, username, password).then((user) => {
    const billData = {
      id: tables.billRequests.length + 1,
      userId: user.id,
      workOrderId: billRequest.workOrderId,
      billResponseId: null,
      price: billRequest.price,
      status: "pending",
      createdAt: time.getTime(),
    };

    for (const key in billData) {
      billData[key] = billData[key] ?? null;
    }

    tables.billRequests.push(billData);

    return billData;
  });
}

// Bill Responses
export async function getBillResponses(tables, username, password) {
  return account.getAccount(tables, username, password).then((user) => {
    if (user.admin) {
      return tables.billResponses;
    }

    return tables.billResponses.filter((value) => value.userId === user.id);
  });
}

export async function postBillResponse(
  tables,
  username,
  password,
  billResponse
) {
  return account.getAccount(tables, username, password).then((user) => {
    const billData = {
      id: tables.billResponses.length + 1,
      userId: user.id,
      billRequestId: billResponse.billRequestId,
      disputed: billResponse.disputed,
      cardNumber: billResponse.cardNumber,
      note: billResponse.note,
      createdAt: time.getTime(),
    };

    for (const key in billData) {
      billData[key] = billData[key] ?? null;
    }

    tables.billResponses.push(billData);

    return billData;
  });
}

// Bill Request Revisions
export async function getBillRequestRevisions(tables, username, password) {
  return account.getAccount(tables, username, password).then((user) => {
    if (user.admin) {
      return tables.billRequestRevisions;
    }

    return tables.billRequestRevisions.filter(
      (value) => value.userId === user.id
    );
  });
}

export async function postBillRequestRevision(
  tables,
  username,
  password,
  billRequestRevision
) {
  return account.getAccount(tables, username, password).then((user) => {
    const billData = {
      id: tables.billRequestRevisions.length + 1,
      userId: user.id,
      price: billRequestRevision.price,
      note: billRequestRevision.note,
      createdAt: time.getTime(),
    };

    for (const key in billData) {
      billData[key] = billData[key] ?? null;
    }

    tables.billRequestRevisions.push(billData);

    return billData;
  });
}

// Bill Response Revisions
export async function getBillResponseRevisions(tables, username, password) {
  return account.getAccount(tables, username, password).then((user) => {
    if (user.admin) {
      return tables.billResponseRevisions;
    }

    return tables.billResponseRevisions.filter(
      (value) => value.userId === user.id
    );
  });
}

export async function postBillResponseRevision(
  tables,
  username,
  password,
  billResponseRevision
) {
  return account.getAccount(tables, username, password).then((user) => {
    const billData = {
      id: tables.billResponseRevisions.length + 1,
      userId: user.id,
      billResponseId: billResponseRevision.billResponseId,
      disputed: billResponseRevision.disputed,
      cardNumber: billResponseRevision.cardNumber,
      note: billResponseRevision.note,
      createdAt: time.getTime(),
    };

    for (const key in billData) {
      billData[key] = billData[key] ?? null;
    }

    tables.billResponseRevisions.push(billData);

    return billData;
  });
}
