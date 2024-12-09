import { getTableHTML } from "/dashboard/scripts/table.js";

export function initializeBadClientsTable(config) {
  fetch("http://" + location.hostname + ":" + config.PORT + "/badClients", {
    credentials: "include",
  })
    .then((response) => response.json())
    .then((badClients) => {
      const badClientsTable = document.getElementById("bad-clients-table");

      badClientsTable.innerHTML = getTableHTML(badClients);
    });
}
