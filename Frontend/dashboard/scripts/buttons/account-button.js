import { initializeAccountForm } from "/dashboard/scripts/components/account/forms/account-form.js";
import { initializeBiggestClientsTable } from "/dashboard/scripts/components/account/tables/biggest-clients-table.js";
import { initializeDifficultClientsTable } from "/dashboard/scripts/components/account/tables/difficult-clients-table.js";
import { initializeProspectiveClientsTable } from "/dashboard/scripts/components/account/tables/prospective-clients-table.js";
import { initializeGoodClientsTable } from "/dashboard/scripts/components/account/tables/good-clients-table.js";
import { initializeBadClientsTable } from "/dashboard/scripts/components/account/tables/bad-clients-table.js";

export function initializeAccountButton(config, account) {
  const accountButton = document.getElementById("account");
  accountButton.onclick = () => {
    setAccountContent(config, account);
  };
}

function setAccountContent(config, account) {
  if (!account) {
    alert("You are not logged in.");
    return;
  }

  fetch("/dashboard/components/account.html")
    .then((response) => response.text())
    .then((content) => {
      const mainContent = document.getElementById("main-content");

      mainContent.innerHTML = content;

      initializeAccountForm(config, account);
      initializeBiggestClientsTable(config);
      initializeDifficultClientsTable(config);
      initializeProspectiveClientsTable(config);
      initializeGoodClientsTable(config);
      initializeBadClientsTable(config);
    });
}
