import { getTableHTML } from "/dashboard/scripts/table.js";

export function initializeBillRequestRevisionsTable(config) {
  fetch(
    "http://" + location.hostname + ":" + config.PORT + "/billRequestRevisions",
    {
      credentials: "include",
    }
  )
    .then((response) => response.json())
    .then((billRequestRevisions) => {
      const billRequestRevisionsTable = document.getElementById(
        "bill-request-revisions-table"
      );

      billRequestRevisionsTable.innerHTML = getTableHTML(billRequestRevisions);
    });
}
