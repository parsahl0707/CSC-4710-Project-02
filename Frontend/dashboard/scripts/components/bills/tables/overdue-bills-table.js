import { getTableHTML } from "/dashboard/scripts/table.js";

export function initializeOverdueBillsTable(config) {
  fetch("http://" + location.hostname + ":" + config.PORT + "/overdueBills", {
    credentials: "include",
  })
    .then((response) => response.json())
    .then((overdueBills) => {
      const overdueBillsTable = document.getElementById("overdue-bills-table");

      overdueBillsTable.innerHTML = getTableHTML(overdueBills);
    });
}
