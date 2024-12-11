import * as cryptography from "../utils/cryptography.js";
import * as time from "../utils/time.js";

export async function getAccount(connection, username, password) {
  const query = "SELECT * FROM Users WHERE username = ? AND password = ?;";
  const parameters = [username, cryptography.hash(password)];
  const result = await connection.query(query, parameters);

  if (!result[0]) {
    throw new Error("Invalid credentials");
  }

  return result[0];
}

export async function getAllAccounts(connection, username, password) {
  const user = await getAccount(connection, username, password);

  if (!user.admin) {
    throw new Error("User is not admin.");
  }

  const query = "SELECT * FROM Users;";
  const result = await connection.query(query);

  return result;
}

export async function getBiggestClients(connection, username, password) {
  const user = await getAccount(connection, username, password);

  if (!user.admin) {
    throw new Error("User is not admin.");
  }

  const query =
    "\
  WITH CompletedWorkOrders AS ( \
    SELECT WorkOrders.id, WorkOrders.userId, COUNT(WorkOrders.id) AS completedOrders \
    FROM WorkOrders \
    WHERE WorkOrders.status = 'completed' \
    GROUP BY WorkOrders.userId \
  ), \
  MaxCompletedOrders AS ( \
    SELECT MAX(completedOrders) AS maxOrders \
    FROM CompletedWorkOrders \
  ) \
  SELECT Users.id, Users.username, Users.firstname, Users.lastname \
  FROM Users \
  JOIN CompletedWorkOrders ON Users.id = CompletedWorkOrders.userId \
  WHERE CompletedWorkOrders.completedOrders = (SELECT maxOrders FROM MaxCompletedOrders) \
  AND Users.admin = 0;";
  const result = connection.query(query);

  return result;
}

export async function getDifficultClients(connection, username, password) {
  const user = await getAccount(connection, username, password);

  if (!user.admin) {
    throw new Error("User is not admin.");
  }

  const query =
    "\
  WITH QuoteRequestsAboveThreshold AS ( \
    SELECT QuoteRequests.id, QuoteRequests.userId, COUNT(QuoteRequests.id) AS requestCount \
    FROM QuoteRequests \
    WHERE QuoteRequests.quoteRequestRevisionId IS NULL \
    AND EXISTS ( \
      SELECT 1 \
      FROM QuoteResponses \
      WHERE QuoteResponses.quoteRequestId = QuoteRequests.id \
    ) \
     GROUP BY QuoteRequests.userId \
     HAVING requestCount >= 3 \
  ) \
  SELECT Users.id, Users.username, Users.firstname, Users.lastname \
  FROM Users \
  JOIN QuoteRequestsAboveThreshold \
  ON Users.id = QuoteRequestsAboveThreshold.userId \
  AND Users.admin = 0;";

  const result = await connection.query(query);

  return result;
}

export async function getProspectiveClients(connection, username, password) {
  const user = await getAccount(connection, username, password);

  if (!user.admin) {
    throw new Error("User is not admin.");
  }

  const query =
    "\
  SELECT Users.id, Users.username, Users.firstname, Users.lastname \
  FROM Users \
  LEFT JOIN QuoteRequests ON Users.id = QuoteRequests.userId \
  WHERE QuoteRequests.id IS NULL \
  AND admin = 0;";

  const result = await connection.query(query);

  return result;
}

export async function getGoodClients(connection, username, password) {
  const user = await getAccount(connection, username, password);

  if (!user.admin) {
    throw new Error("User is not admin.");
  }

  const query =
    "\
  SELECT DISTINCT Users.id, Users.username, Users.firstname, Users.lastname \
  FROM Users \
  JOIN BillRequests ON Users.id = BillRequests.userId \
  WHERE BillRequests.status = 'paid' \
  AND TIMESTAMPDIFF(HOUR, BillRequests.createdAt, BillRequests.paidAt) <= 24 \
  AND EXISTS ( \
        SELECT 1 \
        FROM BillRequests br \
        WHERE br.userId = Users.id \
  );";

  const result = await connection.query(query);

  return result;
}

export async function getBadClients(connection, username, password) {
  const user = await getAccount(connection, username, password);

  if (!user.admin) {
    throw new Error("User is not admin.");
  }

  const query =
    "\
  SELECT DISTINCT u.id, u.username, u.firstname, u.lastname \
  FROM Users u \
  JOIN BillRequests breq ON u.id = breq.userId \
  WHERE EXISTS ( \
    SELECT 1 \
    FROM BillRequests breq1 \
    WHERE breq1.userId = u.id \
    AND breq1.status != 'paid' \
    AND breq1.createdAt <= CURDATE() - INTERVAL 7 DAY \
  ) \
  AND NOT EXISTS ( \
    SELECT 1 \
    FROM BillRequests breq2 \
    WHERE breq2.userId = u.id \
    AND breq2.status = 'paid' \
    AND breq2.paidAt > breq2.createdAt + INTERVAL 7 DAY \
  )";

  const result = await connection.query(query);

  return result;
}
