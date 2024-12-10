import * as cryptography from "../utils/cryptography.js";
import * as time from "../utils/time.js";

export async function getAccount(tables, username, password) {
  if (username == null || password == null) {
    throw new Error("Retrieving account failed. Credentials not provided.");
  }

  const user = tables.users.find(
    (value) =>
      value.username === username &&
      value.password === cryptography.hash(password)
  );

  if (!user) {
    throw new Error("Retrieving account failed. Invalid credentials.");
  }

  return user;
}

export async function getAllAccounts(tables, username, password) {
  return getAccount(tables, username, password).then((user) => {
    if (!user.admin) {
      throw new Error("User is not admin.");
    }

    return tables.users;
  });
}

export async function getBiggestClients(tables, username, password) {
  return getAccount(tables, username, password).then((user) => {
    if (!user.admin) {
      throw new Error("User is not admin.");
    }

    const clientWithLargestNumberOfCompletedWorkOrders = tables.users.reduce(
      (userA, userB) => {
        const userANumberOfWorkOrders = tables.workOrders.filter(
          (workOrder) => workOrder.userId == userA.id
        ).length;

        const userBNumberOfWorkOrders = tables.workOrders.filter(
          (workOrder) => workOrder.userId == userB.id
        ).length;

        return userANumberOfWorkOrders > userBNumberOfWorkOrders
          ? userA
          : userB;
      },
      tables.users[0]
    );

    const largestNumberOfCompletedWorkOrders = tables.workOrders.filter(
      (workOrder) =>
        workOrder.userId == clientWithLargestNumberOfCompletedWorkOrders.id
    ).length;

    const biggestClients = tables.users.filter((client) => {
      const numberOfWorkOrders = tables.workOrders.filter(
        (workOrder) => workOrder.userId == client.id
      ).length;

      return (
        numberOfWorkOrders == largestNumberOfCompletedWorkOrders &&
        client.admin != 1
      );
    });

    return biggestClients;
  });
}

export async function getDifficultClients(tables, username, password) {
  return getAccount(tables, username, password).then((user) => {
    if (!user.admin) {
      throw new Error("User is not admin.");
    }

    const difficultyThreshold = 3;

    const difficultClients = tables.users.filter((client) => {
      const numberOfUnrevisedQuoteRequests = tables.quoteRequests.filter(
        (quoteRequest) =>
          !quoteRequest.quoteRequestRevisionId &&
          quoteRequest.userId == client.id
      ).length;

      return (
        numberOfUnrevisedQuoteRequests >= difficultyThreshold && !client.admin
      );
    });

    return difficultClients;
  });
}

export async function getProspectiveClients(tables, username, password) {
  return getAccount(tables, username, password).then((user) => {
    if (!user.admin) {
      throw new Error("User is not admin.");
    }

    const prospectiveClients = tables.users.filter((client) => {
      const quoteRequest = tables.quoteRequests.find(
        (quoteRequest) => quoteRequest.userId == client.id
      );

      return !quoteRequest && !client.admin;
    });

    return prospectiveClients;
  });
}

export async function getGoodClients(tables, username, password) {
  return getAccount(tables, username, password).then((user) => {
    if (!user.admin) {
      throw new Error("User is not admin.");
    }

    const goodClients = tables.users.filter((client) => {
      const dayLateBill = tables.billRequests.find((billRequest) => {
        return (
          (billRequest.status == "paid" ? billRequest.paidAt : time.getTime()) >
            time.getDayAfterDate(billRequest.createdAt) &&
          billRequest.userId == client.id
        );
      });

      return !dayLateBill && !client.admin;
    });

    return goodClients;
  });
}

export async function getBadClients(tables, username, password) {
  return getAccount(tables, username, password).then((user) => {
    if (!user.admin) {
      throw new Error("User is not admin.");
    }

    const badClients = tables.users.filter((client) => {
      const billRequest = tables.billRequests.find(
        (billRequest) => billRequest.userId == client.id
      );

      const billRequestPaidInTime = tables.billRequests.find(
        (billRequest) =>
          (billRequest.status == "paid"
            ? billRequest.paidAt < time.getWeekAfterDate(billRequest.createdAt)
            : false) && billRequest.userId == client.id
      );

      return !!billRequest && !billRequestPaidInTime && !client.admin;
    });

    return badClients;
  });
}
