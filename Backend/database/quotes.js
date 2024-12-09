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
      // Errors aren't being caught properly so return statement is being used to replace them
      throw new Error("User is not admin");
    }

    getQuoteRequests(connection, username, password)
      .then((quoteRequests) =>
        quoteRequests.find((value) => value.id == quoteResponse.quoteRequestId)
      )
      .then((quoteRequest) => {
        if (!quoteRequest) {
          return;
          // Errors aren't being caught properly so return statement is being used to replace them
          throw new Error("Quote request not found with given ID.");
        }

        if (!!quoteRequest.quoteResponseId) {
          return;
          // Errors aren't being caught properly so return statement is being used to replace them
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

// Quote Request Revisions
export async function getQuoteRequestRevisions(connection, username, password) {
  return account.getAccount(connection, username, password).then((user) => {
    const response = new Promise((resolve, reject) => {
      const query =
        "SELECT * FROM QuoteRequestRevisions " +
        (user.admin == 1 ? "" : "WHERE userId = ?;");

      connection.query(query, [user.id], (err, results) => {
        if (err) reject(new Error(err.message));
        else resolve(results);
      });
    });

    return response;
  });
}

export async function postQuoteRequestRevision(
  connection,
  username,
  password,
  quoteRequestRevision
) {
  return account.getAccount(connection, username, password).then((user) => {
    getQuoteRequests(connection, username, password)
      .then((quoteRequests) =>
        quoteRequests.find(
          (value) => value.id == quoteRequestRevision.quoteRequestId
        )
      )
      .then((quoteRequest) => {
        if (!quoteRequest) {
          return;
          // Errors aren't being caught properly so return statement is being used to replace them
          throw new Error("Quote request not found with given ID.");
        }

        if (quoteRequest.userId != user.id) {
          return;
          // Errors aren't being caught properly so return statement is being used to replace them
          throw new Error("User cannot revise another users request.");
        }

        if (!quoteRequest.quoteResponseId) {
          return;
          // Errors aren't being caught properly so return statement is being used to replace them
          throw new Error("Quote request has no response");
        }

        if (
          quoteRequest.status == "rejected" ||
          quoteRequest.status == "accepted"
        ) {
          return;
          // Errors aren't being caught properly so return statement is being used to replace them
          throw new Error("Quote request already rejected or accepted.");
        }

        new Promise((resolve, reject) => {
          const query =
            "INSERT INTO QuoteRequestRevisions \
                          (userId, quoteRequestId, accepted, note, createdAt) \
                          VALUES (?, ?, ?, ?, ?);";

          connection.query(
            query,
            [
              quoteRequestRevision.userId,
              quoteRequestRevision.quoteRequestId,
              quoteRequestRevision.accepted,
              quoteRequestRevision.note,
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
                "UPDATE QuoteRequests SET quoteRequestRevisionId = ?, status = ? WHERE id = ?;";

              connection.query(
                query,
                [
                  insertId,
                  quoteRequestRevision.accepted ? "accepted" : "negotiating",
                  quoteRequestRevision.quoteRequestId,
                ],
                (err, result) => {
                  if (err) reject(new Error(err.message));
                  else resolve(result);
                }
              );
            });
          });
      });

    if (quoteRequestRevision.accepted) {
      workOrders.postWorkOrder(
        connection,
        username,
        password,
        quoteRequestRevision.quoteRequestId
      );
    }
  });
}

// Quote Response Revisions
export async function getQuoteResponseRevisions(
  connection,
  username,
  password
) {
  return account.getAccount(connection, username, password).then((user) => {
    const response = new Promise((resolve, reject) => {
      const query =
        "SELECT * FROM QuoteResponseRevisions " +
        (user.admin == 1 ? "" : "WHERE userId = ?;");

      connection.query(query, [user.id], (err, results) => {
        if (err) reject(new Error(err.message));
        else resolve(results);
      });
    });

    return response;
  });
}

export async function postQuoteResponseRevision(
  connection,
  username,
  password,
  quoteResponseRevision
) {
  return account.getAccount(connection, username, password).then((user) => {
    if (!user.admin) {
      return;
      // Errors aren't being caught properly so return statement is being used to replace them
      throw new Error("User is not admin");
    }

    getQuoteResponses(connection, username, password)
      .then((quoteResponses) =>
        quoteResponses.find(
          (value) => value.id == quoteResponseRevision.quoteResponseId
        )
      )
      .then((quoteResponse) => {
        if (!quoteResponse) {
          return;
          // Errors aren't being caught properly so return statement is being used to replace them
          throw new Error("Quote response not found with given ID.");
        }

        getQuoteRequests(connection, username, password)
          .then((quoteRequests) =>
            quoteRequests.find(
              (value) => value.id == quoteResponse.quoteRequestId
            )
          )
          .then((quoteRequest) => {
            if (!quoteRequest) {
              return;
              // Errors aren't being caught properly so return statement is being used to replace them
              throw new Error("Quote request not found with given ID.");
            }

            if (
              quoteRequest.status == "rejected" ||
              quoteRequest.status == "accepted"
            ) {
              return;
              // Errors aren't being caught properly so return statement is being used to replace them
              throw new Error("Quote request already rejected or accepted.");
            }

            new Promise((resolve, reject) => {
              const query =
                "INSERT INTO QuoteResponseRevisions \
                                (userId, quoteResponseId, rejected, proposedPrice, \
                                startDate, endDate, note, createdAt) \
                                VALUES (?, ?, ?, ?, ?, ?, ?, ?);";

              connection.query(
                query,
                [
                  quoteRequest.userId,
                  quoteResponseRevision.quoteResponseId,
                  quoteResponseRevision.rejected,
                  quoteResponseRevision.proposedPrice,
                  quoteResponseRevision.startDate,
                  quoteResponseRevision.endDate,
                  quoteResponseRevision.note,
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
                    "UPDATE QuoteResponses SET quoteResponseRevisionId = ? WHERE id = ?;";

                  connection.query(
                    query,
                    [insertId, quoteResponseRevision.quoteResponseId],
                    (err, result) => {
                      if (err) reject(new Error(err.message));
                      else resolve(result);
                    }
                  );
                });

                if (!quoteResponseRevision.rejected) {
                  return;
                }
                new Promise((resolve, reject) => {
                  const query =
                    "UPDATE QuoteRequests SET status = 'rejected' WHERE id = ?;";

                  connection.query(query, [quoteRequest.id], (err, result) => {
                    if (err) reject(new Error(err.message));
                    else resolve(result);
                  });
                });
              });
          });
      });

    if (quoteRequestRevision.accepted) {
      workOrders.postWorkOrder(
        connection,
        username,
        password,
        quoteRequestRevision.quoteRequestId
      );
    }
  });
}
