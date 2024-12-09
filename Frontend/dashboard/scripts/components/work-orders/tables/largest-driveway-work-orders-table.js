import { getTableHTML } from "/dashboard/scripts/table.js";

export function initializeLargestDrivewayWorkOrdersTable(config) {
  fetch(
    "http://" +
      location.hostname +
      ":" +
      config.PORT +
      "/largestDrivewayWorkOrders",
    {
      credentials: "include",
    }
  )
    .then((response) => response.json())
    .then((largestDrivewayWorkOrders) => {
      const largestDrivewayWorkOrdersTable = document.getElementById(
        "largest-driveway-work-orders-table"
      );

      largestDrivewayWorkOrdersTable.innerHTML = getTableHTML(
        largestDrivewayWorkOrders
      );
    });
}
