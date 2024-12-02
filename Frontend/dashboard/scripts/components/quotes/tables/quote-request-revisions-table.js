import { getTableHTML } from "../../../table.js";

export function initializeQuoteRequestRevisionsTable(config) {
  fetch(
    "http://" +
      location.hostname +
      ":" +
      config.PORT +
      "/quoteRequestRevisions",
    {
      credentials: "include",
    }
  )
    .then((response) => response.json())
    .then((quoteRequestRevisions) => {
      const quoteRequestRevisionsTable = document.getElementById(
        "quote-request-revisions-table"
      );

      quoteRequestRevisionsTable.innerHTML = getTableHTML(
        quoteRequestRevisions
      );
    });
}
