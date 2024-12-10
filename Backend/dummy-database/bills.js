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
    if (!user.admin) {
      throw new Error("User is not admin");
    }

    const workOrder = tables.workOrders.find(
      (value) => value.id == billRequest.workOrderId
    );

    if (!workOrder) {
      throw new Error("Work order not found with given ID.");
    }

    const billData = {
      id: tables.billRequests.length + 1,
      userId: workOrder.userId,
      workOrderId: billRequest.workOrderId,
      billResponseId: null,
      billRequestRevisionId: null,
      price: billRequest.price,
      status: "pending",
      paidAt: null,
      createdAt: time.getTime(),
    };

    for (const key in billData) {
      billData[key] = billData[key] ?? null;
    }

    workOrder.status = "completed";
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
    const billRequest = tables.billRequests.find(
      (value) => value.id == billResponse.billRequestId
    );

    if (!billRequest) {
      throw new Error("Bill request not found with given ID.");
    }

    if (!!billRequest.billResponseId) {
      throw new Error("Bill request already has bill response.");
    }

    const billData = {
      id: tables.billResponses.length + 1,
      userId: user.id,
      billRequestId: billResponse.billRequestId,
      billResponseRevisionId: null,
      disputed: billResponse.disputed,
      cardNumber: billResponse.cardNumber,
      note: billResponse.note,
      createdAt: time.getTime(),
    };

    for (const key in billData) {
      billData[key] = billData[key] ?? null;
    }

    billRequest.status = billData.disputed ? "disputed" : "paid";

    if (!billData.disputed) {
      billRequest.paidAt = time.getTime();
    }

    billRequest.billResponseId = billData.id;

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
    const billRequest = tables.billRequests.find(
      (value) => value.id == billRequestRevision.billRequestId
    );

    if (!billRequest) {
      throw new Error("Bill request not found with given ID.");
    }

    const billData = {
      id: tables.billRequestRevisions.length + 1,
      userId: user.id,
      billRequestId: billRequestRevision.billRequestId,
      price: billRequestRevision.price,
      note: billRequestRevision.note,
      createdAt: time.getTime(),
    };

    for (const key in billData) {
      billData[key] = billData[key] ?? null;
    }

    billRequest.billRequestRevisionId = billData.id;

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
    const billResponse = tables.billResponses.find(
      (value) => value.id == billResponseRevision.billResponseId
    );

    if (!billResponse) {
      throw new Error("Bill response not found with given ID.");
    }

    const billRequest = tables.billRequests.find(
      (value) => value.id == billResponse.billRequestId
    );

    if (!billRequest) {
      throw new Error("Bill request not found with given ID.");
    }

    if (billRequest.status == "paid") {
      throw new Error("Bill request already paid for.");
    }

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

    billResponse.billResponseRevisionId = billData.id;

    billRequest.status = billData.disputed ? "disputed" : "paid";
    if (!billData.disputed) {
      billRequest.paidAt = time.getTime();
    }

    tables.billResponseRevisions.push(billData);

    return billData;
  });
}

// Overdue Bills
export async function getOverdueBills(tables, username, password) {
  return account.getAccount(tables, username, password).then((user) => {
    const overdueBills = tables.billRequests.filter(
      (billRequest) =>
        (billRequest.status == "paid" ? billRequest.paidAt : time.getTime()) >
        time.getWeekAfterDate(billRequest.createdAt)
    );

    if (user.admin) {
      return overdueBills;
    }

    return overdueBills.filter((value) => value.userId === user.id);
  });
}

// Revenue
export async function getRevenue(tables, username, password, date) {
  return account.getAccount(tables, username, password).then((user) => {
    if (!user.admin) {
      throw new Error("User is not admin.");
    }

    const billsWithinDate = tables.billRequests.filter(
      (billRequest) =>
        billRequest.status == "paid" &&
        date.startDate <= billRequest.paidAt &&
        billRequest.paidAt <= date.endDate
    );

    const revenue = billsWithinDate.reduce(
      (accumulator, currrentBill) => accumulator + currrentBill.price,
      0
    );

    return revenue;
  });
}
