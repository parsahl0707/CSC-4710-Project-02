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
  SELECT Users.id, Users.username, Users.firstname, Users.lastname \
  FROM Users \
  JOIN BillRequests br1 ON Users.id = br1.userId \
  WHERE br1.status = 'paid' \
  AND br1.paidAt > DATE_ADD(br1.createdAt, INTERVAL 7 DAY) \
  GROUP BY Users.id \
  HAVING NOT EXISTS ( \
    SELECT 1 \
    FROM BillRequests br2 \
    WHERE br2.userId = Users.id \
    AND br2.status = 'paid' \
    AND br2.paidAt > DATE_ADD(br2.createdAt, INTERVAL 7 DAY) \
  )";

  const result = await connection.query(query);

  return result;
}
