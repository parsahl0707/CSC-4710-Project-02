import * as account from "./account.js";
import * as workOrders from "./work-orders.js";
import * as time from "../utils/time.js";

// Quote Requests
export async function getQuoteRequests(tables, username, password) {
  return account.getAccount(tables, username, password).then((user) => {
    if (user.admin) {
      return tables.quoteRequests;
    }

    return tables.quoteRequests.filter((value) => value.userId === user.id);
  });
}

export async function postQuoteRequest(
  tables,
  username,
  password,
  quoteRequest
) {
  return account.getAccount(tables, username, password).then((user) => {
    const quoteData = {
      id: tables.quoteRequests.length + 1,
      userId: user.id,
      quoteResponseId: null,
      quoteRequestRevisionId: null,
      street: quoteRequest.street,
      city: quoteRequest.city,
      state: quoteRequest.state,
      zipCode: quoteRequest.zipCode,
      country: quoteRequest.country,
      drivewaySize: quoteRequest.drivewaySize,
      proposedPrice: quoteRequest.proposedPrice,
      imageUrl1: quoteRequest.imageUrl1,
      imageUrl2: quoteRequest.imageUrl2,
      imageUrl3: quoteRequest.imageUrl3,
      imageUrl4: quoteRequest.imageUrl4,
      imageUrl5: quoteRequest.imageUrl5,
      note: quoteRequest.note,
      status: "pending",
      createdAt: time.getTime(),
    };

    for (const key in quoteData) {
      quoteData[key] = quoteData[key] ?? null;
    }

    tables.quoteRequests.push(quoteData);

    return quoteData;
  });
}

// Quote Responses
export async function getQuoteResponses(tables, username, password) {
  return account.getAccount(tables, username, password).then((user) => {
    if (user.admin) {
      return tables.quoteResponses;
    }

    return tables.quoteResponses.filter((value) => value.userId === user.id);
  });
}

export async function postQuoteResponse(
  tables,
  username,
  password,
  quoteResponse
) {
  return account.getAccount(tables, username, password).then((user) => {
    if (!user.admin) {
      throw new Error("User is not admin.");
    }

    const quoteRequest = tables.quoteRequests.find(
      (value) => value.id == quoteResponse.quoteRequestId
    );

    if (!quoteRequest) {
      throw new Error("Quote request not found with given ID.");
    }

    if (!!quoteRequest.quoteResponseId) {
      throw new Error("Quote request already has quote response.");
    }

    const quoteData = {
      id: tables.quoteResponses.length + 1,
      userId: quoteRequest.userId,
      quoteRequestId: quoteResponse.quoteRequestId,
      quoteResponseRevisionId: null,
      rejected: quoteResponse.rejected,
      proposedPrice: quoteResponse.proposedPrice,
      startDate: quoteResponse.startDate,
      endDate: quoteResponse.endDate,
      note: quoteResponse.note,
      createdAt: time.getTime(),
    };

    for (const key in quoteData) {
      quoteData[key] = quoteData[key] ?? null;
    }

    quoteRequest.quoteResponseId = quoteData.id;
    quoteRequest.status = quoteData.rejected ? "rejected" : "negotiating";

    tables.quoteResponses.push(quoteData);

    return quoteData;
  });
}

// Quote Request Revisions
export async function getQuoteRequestRevisions(tables, username, password) {
  return account.getAccount(tables, username, password).then((user) => {
    if (user.admin) {
      return tables.quoteRequestRevisions;
    }

    return tables.quoteRequestRevisions.filter(
      (value) => value.userId === user.id
    );
  });
}

export async function postQuoteRequestRevision(
  tables,
  username,
  password,
  quoteRequestRevision
) {
  return account.getAccount(tables, username, password).then((user) => {
    const quoteRequest = tables.quoteRequests.find(
      (value) => value.id == quoteRequestRevision.quoteRequestId
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

    if (
      quoteRequest.status == "rejected" ||
      quoteRequest.status == "accepted"
    ) {
      throw new Error("Quote request already rejected or accepted.");
    }

    const quoteData = {
      id: tables.quoteRequestRevisions.length + 1,
      userId: user.id,
      quoteRequestId: quoteRequestRevision.quoteRequestId,
      accepted: quoteRequestRevision.accepted,
      note: quoteRequestRevision.note,
      createdAt: time.getTime(),
    };

    for (const key in quoteData) {
      quoteData[key] = quoteData[key] ?? null;
    }

    if (quoteData.accepted) {
      quoteRequest.status = "accepted";

      workOrders.postWorkOrder(
        tables,
        username,
        password,
        quoteData.quoteRequestId
      );
    }

    quoteRequest.quoteRequestRevisionId = quoteData.id;

    tables.quoteRequestRevisions.push(quoteData);

    return quoteData;
  });
}

// Quote Response Revisions
export async function getQuoteResponseRevisions(tables, username, password) {
  return account.getAccount(tables, username, password).then((user) => {
    if (user.admin) {
      return tables.quoteResponseRevisions;
    }

    return tables.quoteResponseRevisions.filter(
      (value) => value.userId === user.id
    );
  });
}

export async function postQuoteResponseRevision(
  tables,
  username,
  password,
  quoteResponseRevision
) {
  return account.getAccount(tables, username, password).then((user) => {
    if (!user.admin) {
      throw new Error("User is not admin.");
    }

    const quoteResponse = tables.quoteResponses.find(
      (value) => value.id == quoteResponseRevision.quoteResponseId
    );

    if (!quoteResponse) {
      throw new Error("Quote response not found with given ID.");
    }

    const quoteRequest = tables.quoteRequests.find(
      (value) => value.id == quoteResponse.quoteRequestId
    );

    if (!quoteRequest) {
      throw new Error("Quote request not found with given ID.");
    }

    if (
      quoteRequest.status == "rejected" ||
      quoteRequest.status == "accepted"
    ) {
      throw new Error("Quote request already rejected or accepted.");
    }

    const quoteData = {
      id: tables.quoteResponseRevisions.length + 1,
      userId: quoteResponse.userId,
      quoteResponseId: quoteResponseRevision.quoteResponseId,
      rejected: quoteResponseRevision.rejected,
      proposedPrice: quoteResponseRevision.proposedPrice,
      startDate: quoteResponseRevision.startDate,
      endDate: quoteResponseRevision.endDate,
      note: quoteResponseRevision.note,
      createdAt: time.getTime(),
    };

    for (const key in quoteData) {
      quoteData[key] = quoteData[key] ?? null;
    }

    quoteRequest.status = quoteData.rejected ? "rejected" : quoteRequest.status;

    quoteResponse.quoteResponseRevisionId = quoteData.id;

    tables.quoteResponseRevisions.push(quoteData);

    return quoteData;
  });
}

// Agreed Quotes
export async function getAgreedQuotes(tables, username, password) {
  return account.getAccount(tables, username, password).then((user) => {
    const firstDayOfMonth = time.getFirstDayOfMonthToday();

    const agreedQuotes = tables.quoteRequests.filter(
      (quoteRequest) =>
        quoteRequest.status == "accepted" &&
        quoteRequest.createdAt > firstDayOfMonth
    );

    if (user.admin) {
      return agreedQuotes;
    }

    return agreedQuotes.filter((value) => value.userId === user.id);
  });
}
