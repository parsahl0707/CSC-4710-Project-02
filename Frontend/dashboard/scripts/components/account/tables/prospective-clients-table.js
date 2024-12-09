import { getTableHTML } from "/dashboard/scripts/table.js";

export function initializeProspectiveClientsTable(config) {
  fetch(
    "http://" + location.hostname + ":" + config.PORT + "/prospectiveClients",
    {
      credentials: "include",
    }
  )
    .then((response) => response.json())
    .then((prospectiveClients) => {
      const prospectiveClientsTable = document.getElementById(
        "prospective-clients-table"
      );

      prospectiveClientsTable.innerHTML = getTableHTML(prospectiveClients);
    });
}
