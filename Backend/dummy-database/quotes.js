import * as account from "./account.js";
import * as time from "../utils/time.js";

export async function getQuoteRequests(tables, username, password) {
  return account.getAccount(tables, username, password).then((user) => {
    if (user.admin) {
      return tables.quoteRequests;
    }

    return tables.quoteRequests.find((value) => value.userId === user.id);
  });
}

export async function postQuoteRequests(tables, username, password, quote) {
  return account.getAccount(tables, username, password).then((user) => {
    const quoteData = {
      id: tables.quoteRequests.length + 1,
      userId: user.userId,
      quoteResponseId: null,
      street: quote.street,
      city: quote.city,
      state: quote.state,
      zipCode: quote.zipCode,
      country: quote.country,
      drivewaySize: quote.drivewaySize,
      proposedPrice: quote.proposedPrice,
      imageUrl1: quote.imageUrl1,
      imageUrl2: quote.imageUrl2,
      imageUrl3: quote.imageUrl3,
      imageUrl4: quote.imageUrl4,
      imageUrl5: quote.imageUrl5,
      note: quote.note,
      status: quote.status,
      createdAt: time.getTime(),
    };

    for (const key in quoteData) {
      quoteData[key] = quoteData[key] ?? null;
    }

    tables.quoteRequests.push(quoteData);

    return quoteData;
  });
}
