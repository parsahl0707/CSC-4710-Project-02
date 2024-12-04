import { getTableHTML } from "/dashboard/scripts/table.js";

export function initializeBillResponsesTable(config) {
  fetch("http://" + location.hostname + ":" + config.PORT + "/billResponses", {
    credentials: "include",
  })
    .then((response) => response.json())
    .then((billResponses) => {
      const billResponsesTable = document.getElementById(
        "bill-responses-table"
      );

      billResponsesTable.innerHTML = getTableHTML(billResponses);
    });
}
