import { getTableHTML } from "/dashboard/scripts/table.js";

export function initializeBillResponseRevisionsTable(config) {
  fetch(
    "http://" +
      location.hostname +
      ":" +
      config.PORT +
      "/billResponseRevisions",
    {
      credentials: "include",
    }
  )
    .then((response) => response.json())
    .then((billResponseRevisions) => {
      const billResponseRevisionsTable = document.getElementById(
        "bill-response-revisions-table"
      );

      billResponseRevisionsTable.innerHTML = getTableHTML(
        billResponseRevisions
      );
    });
}
