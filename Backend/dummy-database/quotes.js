import * as account from "./account.js";
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
    const quoteData = {
      id: tables.quoteResponses.length + 1,
      userId: user.id,
      quoteRequestId: quoteResponse.quoteRequestId,
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
    const quoteData = {
      id: tables.quoteResponseRevisions.length + 1,
      userId: user.id,
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

    tables.quoteResponseRevisions.push(quoteData);

    return quoteData;
  });
}
