import { getTableHTML } from "/dashboard/scripts/table.js";

export function initializeQuoteResponsesTable(config) {
  fetch("http://" + location.hostname + ":" + config.PORT + "/quoteResponses", {
    credentials: "include",
  })
    .then((response) => response.json())
    .then((quoteResponses) => {
      const quoteResponsesTable = document.getElementById(
        "quote-responses-table"
      );

      quoteResponsesTable.innerHTML = getTableHTML(quoteResponses);
    });
}
