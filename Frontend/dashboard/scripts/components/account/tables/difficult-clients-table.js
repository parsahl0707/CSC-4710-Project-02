import { getTableHTML } from "/dashboard/scripts/table.js";

export function initializeDifficultClientsTable(config) {
  fetch(
    "http://" + location.hostname + ":" + config.PORT + "/difficultClients",
    {
      credentials: "include",
    }
  )
    .then((response) => response.json())
    .then((difficultClients) => {
      const difficultClientsTable = document.getElementById(
        "difficult-clients-table"
      );

      difficultClientsTable.innerHTML = getTableHTML(difficultClients);
    });
}
