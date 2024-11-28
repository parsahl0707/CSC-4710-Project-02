export function initializeButtons(config) {
  import("./buttons/quotes-button.js").then((quotesButton) => {
    quotesButton.initializeQuotesButton(config);
  });

  import("./buttons/work-orders-button.js").then((workOrdersButton) => {
    workOrdersButton.initializeWorkOrdersButton(config);
  });

  import("./buttons/bills-button.js").then((billsButton) => {
    billsButton.initializeBillsButton(config);
  });

  import("./buttons/account-button.js").then((accountButton) => {
    accountButton.initializeAccountButton(config);
  });

  import("./buttons/logout-button.js").then((logoutButton) => {
    logoutButton.initializeLogoutButton();
  });
}
