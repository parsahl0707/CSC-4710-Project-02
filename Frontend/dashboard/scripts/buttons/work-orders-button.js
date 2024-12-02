import { initializeWorkOrdersTable } from "../components/work-orders/tables/work-orders-table.js";

export function initializeWorkOrdersButton(config, account) {
  const workOrdersButton = document.getElementById("work-orders");
  workOrdersButton.onclick = () => {
    setWorkOrdersContent(config, account);
  };
}

function setWorkOrdersContent(config, account) {
  if (!account) {
    alert("You are not logged in.");
    return;
  }

  fetch("/dashboard/components/work-orders.html")
    .then((response) => response.text())
    .then((content) => {
      const mainContent = document.getElementById("main-content");

      mainContent.innerHTML = content;

      initializeWorkOrdersTable(config);
    });
}
