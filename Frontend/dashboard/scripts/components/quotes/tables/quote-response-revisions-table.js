import { getTableHTML } from "/dashboard/scripts/table.js";

export function initializeQuoteResponseRevisionsTable(config) {
  fetch(
    "http://" +
      location.hostname +
      ":" +
      config.PORT +
      "/quoteResponseRevisions",
    {
      credentials: "include",
    }
  )
    .then((response) => response.json())
    .then((quoteResponseRevisions) => {
      const quoteResponseRevisionsTable = document.getElementById(
        "quote-response-revisions-table"
      );

      quoteResponseRevisionsTable.innerHTML = getTableHTML(
        quoteResponseRevisions
      );
    });
}
