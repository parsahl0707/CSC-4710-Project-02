import { initializeBillRequestForm } from "../components/bills/forms/bill-request-form.js";
import { initializeBillRequestRevisionForm } from "../components/bills/forms/bill-request-revision-form.js";
import { initializeBillResponseForm } from "../components/bills/forms/bill-response-form.js";
import { initializeBillResponseRevisionForm } from "../components/bills/forms/bill-response-revision-form.js";

import { initializeBillRequestsTable } from "../components/bills/tables/bill-requests-table.js";
import { initializeBillRequestRevisionsTable } from "../components/bills/tables/bill-request-revisions-table.js";
import { initializeBillResponsesTable } from "../components/bills/tables/bill-response-revisions-table.js";
import { initializeBillResponseRevisionsTable } from "../components/bills/tables/bill-responses-table.js";

export function initializeBillsButton(config, account) {
  const billsButton = document.getElementById("bills");
  billsButton.onclick = () => {
    setBillsContent(config, account);
  };
}

function setBillsContent(config, account) {
  if (!account) {
    alert("You are not logged in.");
    return;
  }

  fetch("/dashboard/components/bills.html")
    .then((response) => response.text())
    .then((content) => {
      const mainContent = document.getElementById("main-content");

      mainContent.innerHTML = content;

      initializeBillRequestForm(config);
      initializeBillRequestRevisionForm(config);
      initializeBillResponseForm(config);
      initializeBillResponseRevisionForm(config);

      initializeBillRequestsTable(config);
      initializeBillRequestRevisionsTable(config);
      initializeBillResponsesTable(config);
      initializeBillResponseRevisionsTable(config);
    });
}
