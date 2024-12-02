import { getTableHTML } from "../../../table.js";

export function initializeWorkOrdersTable(config) {
  fetch("http://" + location.hostname + ":" + config.PORT + "/workOrders", {
    credentials: "include",
  })
    .then((response) => response.json())
    .then((workOrders) => {
      const workOrdersTable = document.getElementById("work-orders-table");

      workOrdersTable.innerHTML = getTableHTML(workOrders);
    });
}
