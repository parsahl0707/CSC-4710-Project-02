import { getTableHTML } from "/dashboard/scripts/table.js";

export function initializeBillRequestsTable(config) {
  fetch("http://" + location.hostname + ":" + config.PORT + "/billRequests", {
    credentials: "include",
  })
    .then((response) => response.json())
    .then((billRequests) => {
      const billRequestsTable = document.getElementById("bill-requests-table");

      billRequestsTable.innerHTML = getTableHTML(billRequests);
    });
}
