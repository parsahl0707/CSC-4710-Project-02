import * as account from "./account.js";
import * as quotes from "./quotes.js";
import * as time from "../utils/time.js";

export async function getWorkOrders(tables, username, password) {
  return account.getAccount(tables, username, password).then((user) => {
    if (user.admin) {
      return tables.workOrders;
    }

    return tables.workOrders.filter((value) => value.userId === user.id);
  });
}

export async function postWorkOrder(
  tables,
  username,
  password,
  quoteRequestId
) {
  return account.getAccount(tables, username, password).then((user) => {
    const quoteRequest = tables.quoteRequests.find(
      (value) => value.id == quoteRequestId
    );

    if (!user.admin && !quoteRequest.userId == user.id) {
      throw new Error("User is not authorized");
    }

    if (!quoteRequest) {
      throw new Error("Quote request not found with given ID.");
    }

    if (
      quoteRequest.status == "pending" ||
      quoteRequest.status == "negotiating"
    ) {
      throw new Error(`Quote request still ${quoteRequest.status}`);
    }

    const quoteResponse = tables.quoteResponses.find(
      (value) => value.id == quoteRequest.quoteResponseId
    );

    const currentQuoteResponseRevision = !quoteResponse.quoteResponseId
      ? quoteResponse
      : tables.quoteResponseRevisions.find(
          (value) => value.id == quoteResponse.quoteResponseId
        );

    if (!currentQuoteResponseRevision) {
      throw new Error("Could not find quote response or response revision");
    }

    const workOrderData = {
      id: tables.workOrders.length + 1,
      userId: quoteRequest.userId,
      quoteRequestId: quoteRequestId,
      price: currentQuoteResponseRevision.proposedPrice,
      startDate: currentQuoteResponseRevision.startDate,
      endDate: currentQuoteResponseRevision.endDate,
      status: "pending",
      createdAt: time.getTime(),
    };

    for (const key in workOrderData) {
      workOrderData[key] = workOrderData[key] ?? null;
    }

    tables.workOrders.push(workOrderData);

    return workOrderData;
  });
}

// Largest Driveway Work Orders
export async function getLargestDrivewayWorkOrders(tables, username, password) {
  return account.getAccount(tables, username, password).then((user) => {
    const largestDrivewaySize = tables.workOrders.reduce(
      (workOrderA, workOrderB) => {
        const drivewaySizeA = tables.quoteRequests.find(
          (quoteRequest) => quoteRequest.id == workOrderA.quoteRequestId
        ).drivewaySize;

        const drivewaySizeB = tables.quoteRequests.find(
          (quoteRequest) => quoteRequest.id == workOrderB.quoteRequestId
        ).drivewaySize;

        return drivewaySizeA > drivewaySizeB ? workOrderA : workOrderB;
      },
      tables.workOrders[0]
    );

    const largestDrivewayWorkOrders = tables.workOrders.filter((workOrder) => {
      const drivewaySize = tables.quoteRequests.find(
        (quoteRequest) => quoteRequest.id == workOrder.quoteRequestId
      ).drivewaySize;

      return drivewaySize == largestDrivewaySize;
    });

    if (user.admin) {
      return largestDrivewayWorkOrders;
    }

    return largestDrivewayWorkOrders.filter(
      (value) => value.userId === user.id
    );
  });
}
