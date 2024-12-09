import { getTableHTML } from "/dashboard/scripts/table.js";

export function initializeAgreedQuotesTable(config) {
  fetch("http://" + location.hostname + ":" + config.PORT + "/agreedQuotes", {
    credentials: "include",
  })
    .then((response) => response.json())
    .then((agreedQuotes) => {
      const agreedQuotesTable = document.getElementById("agreed-quotes-table");

      agreedQuotesTable.innerHTML = getTableHTML(agreedQuotes);
    });
}
