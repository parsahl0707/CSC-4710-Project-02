import { getTableHTML } from "/dashboard/scripts/table.js";

export function initializeBiggestClientsTable(config) {
  fetch("http://" + location.hostname + ":" + config.PORT + "/biggestClients", {
    credentials: "include",
  })
    .then((response) => response.json())
    .then((biggestClients) => {
      const biggestClientsTable = document.getElementById(
        "biggest-clients-table"
      );

      biggestClientsTable.innerHTML = getTableHTML(biggestClients);
    });
}
