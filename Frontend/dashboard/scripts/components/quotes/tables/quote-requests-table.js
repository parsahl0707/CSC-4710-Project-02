import { getTableHTML } from "../../../table.js";

export function initializeQuoteRequestsTable(config) {
  fetch("http://" + location.hostname + ":" + config.PORT + "/quoteRequests", {
    credentials: "include",
  })
    .then((response) => response.json())
    .then((quoteRequests) => {
      const quoteRequestsTable = document.getElementById(
        "quote-requests-table"
      );

      quoteRequestsTable.innerHTML = getTableHTML(quoteRequests);
    });
}
