import * as account from "./account.js";
import * as quotes from "./quotes.js";
import * as time from "../utils/time.js";

export async function getWorkOrders(connection, username, password) {
  return account.getAccount(connection, username, password).then((user) => {
    const response = new Promise((resolve, reject) => {
      const query =
        "SELECT * FROM WorkOrders " +
        (user.admin == 1 ? "" : "WHERE userId = ?;");

      connection.query(query, [user.id], (err, results) => {
        if (err) reject(new Error(err.message));
        else resolve(results);
      });
    });

    return response;
  });
}

export async function postWorkOrder(
  connection,
  username,
  password,
  quoteRequestId
) {
  return account.getAccount(connection, username, password).then((user) => {
    if (!user.admin) {
      return;
      // Errors aren't being caught properly so return statement is being used to replace them
      throw new Error("User is not admin");
    }

    quotes
      .getQuoteRequests(connection, username, password)
      .then((quoteRequests) =>
        quoteRequests.find((value) => value.id == quoteRequestId)
      )
      .then((quoteRequest) => {
        if (!quoteRequest) {
          return;
          // Errors aren't being caught properly so return statement is being used to replace them
          throw new Error("Quote response not found with given ID.");
        }

        if (!user.admin && !quoteRequest.userId == user.id) {
          return;
          // Errors aren't being caught properly so return statement is being used to replace them
          throw new Error("User is not authorized");
        }

        if (
          quoteRequest.status == "pending" ||
          quoteRequest.status == "negotiating"
        ) {
          throw new Error(`Quote request still ${quoteRequest.status}`);
        }

        quotes
          .getQuoteResponses(connection, username, password)
          .then((quoteResponses) =>
            quoteResponses.find(
              (value) => value.id == quoteRequest.quoteResponseId
            )
          )
          .then((quoteResponse) => {
            if (!quoteResponse) {
              return;
              // Errors aren't being caught properly so return statement is being used to replace them
              throw new Error("Quote request not found with given ID.");
            }

            quotes
              .getQuoteResponseRevisions(connection, username, password)
              .then((quoteResponseRevisions) =>
                quoteResponseRevisions.find(
                  (value) => value.id == quoteResponse.quoteResponseRevisionId
                )
              )
              .then((quoteResponseRevision) => {
                if (!quoteResponseRevision) {
                  return;
                  // Errors aren't being caught properly so return statement is being used to replace them
                  throw new Error(
                    "Could not find quote response or response revision"
                  );
                }

                new Promise((resolve, reject) => {
                  const query =
                    "INSERT INTO WorkOrders \
                                        (userId, quoteRequestId, price, \
                                        startDate, endDate, status, createdAt) \
                                        VALUES (?, ?, ?, ?, ?, ?, ?);";

                  connection.query(
                    query,
                    [
                      quoteRequest.userId,
                      quoteResponseRevision.proposedPrice,
                      quoteResponseRevision.startDate,
                      quoteResponseRevision.endDate,
                      "pending",
                      time.getTime(),
                    ],
                    (err, result) => {
                      if (err) reject(new Error(err.message));
                      else resolve(result);
                    }
                  );
                });
              });
          });
      });
  });
}
