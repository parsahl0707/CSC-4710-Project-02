import * as account from "./account.js";
import * as workOrders from "./work-orders.js";
import * as time from "../utils/time.js";
import * as cryptography from "../utils/cryptography.js";

// Quote Requests
export async function getQuoteRequests(connection, username, password) {
  return account.getAccount(connection, username, password).then((user) => {
    const response = new Promise((resolve, reject) => {
      const query =
        "SELECT * FROM QuoteRequests " +
        (user.admin == 1 ? "" : "WHERE userId = ?;");

      connection.query(query, [user.id], (err, results) => {
        if (err) reject(new Error(err.message));
        else resolve(results);
      });
    });

    return response;
  });
}

export async function postQuoteRequest(
  connection,
  username,
  password,
  quoteRequest
) {
  return account.getAccount(connection, username, password).then((user) => {
    const response = new Promise((resolve, reject) => {
      const query =
        "INSERT INTO QuoteRequests \
          (userId, street, city, state, \
          zipCode, country, drivewaySize, proposedPrice, \
          imageUrl1, imageUrl2, imageUrl3, imageUrl4, imageUrl5, \
          note, status, createdAt) \
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";

      connection.query(
        query,
        [
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
        ],
        (err, result) => {
          if (err) reject(new Error(err.message));
          else resolve(result);
        }
      );
    });

    return response;
  });
}

// Quote Responses
export async function getQuoteResponses(connection, username, password) {
  return account.getAccount(connection, username, password).then((user) => {
    const response = new Promise((resolve, reject) => {
      const query =
        "SELECT * FROM QuoteResponses " +
        (user.admin == 1 ? "" : "WHERE userId = ?;");

      connection.query(query, [user.id], (err, results) => {
        if (err) reject(new Error(err.message));
        else resolve(results);
      });
    });

    return response;
  });
}

export async function postQuoteResponse(
  connection,
  username,
  password,
  quoteResponse
) {
  return account.getAccount(connection, username, password).then((user) => {
    if (!user.admin) {
      return;
      throw new Error("User is not admin");
    }

    getQuoteRequests(connection, username, password)
      .then((quoteRequests) =>
        quoteRequests.find((value) => value.id == quoteResponse.quoteRequestId)
      )
      .then((quoteRequest) => {
        if (!quoteRequest) {
          return;
          throw new Error("Quote request not found with given ID.");
        }

        if (!!quoteRequest.quoteResponseId) {
          return;
          throw new Error("Quote request already has quote response.");
        }

        new Promise((resolve, reject) => {
          const query =
            "INSERT INTO QuoteResponses \
                        (userId, quoteRequestId, rejected, proposedPrice, \
                        startDate, endDate, note, createdAt) \
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?);";

          connection.query(
            query,
            [
              quoteRequest.userId,
              quoteResponse.quoteRequestId,
              quoteResponse.rejected,
              quoteResponse.proposedPrice,
              quoteResponse.startDate,
              quoteResponse.endDate,
              quoteResponse.note,
              time.getTime(),
            ],
            (err, result) => {
              if (err) reject(new Error(err.message));
              else resolve(result);
            }
          );
        })
          .then((response) => response.insertId)
          .then((insertId) => {
            new Promise((resolve, reject) => {
              const query =
                "UPDATE QuoteRequests SET quoteResponseId = ?, status = ? WHERE id = ?;";

              connection.query(
                query,
                [
                  insertId,
                  quoteResponse.rejected ? "rejected" : "negotiating",
                  quoteResponse.quoteRequestId,
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
}
