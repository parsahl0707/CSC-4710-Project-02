import { getTableHTML } from "/dashboard/scripts/table.js";

export function initializeGoodClientsTable(config) {
  fetch("http://" + location.hostname + ":" + config.PORT + "/goodClients", {
    credentials: "include",
  })
    .then((response) => response.json())
    .then((goodClients) => {
      const goodClientsTable = document.getElementById("good-clients-table");

      goodClientsTable.innerHTML = getTableHTML(goodClients);
    });
}
