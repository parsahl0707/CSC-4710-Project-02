export function initializeButtons(config, account) {
  import("./buttons/quotes-button.js").then((quotesButton) => {
    quotesButton.initializeQuotesButton(config, account);
  });

  import("./buttons/work-orders-button.js").then((workOrdersButton) => {
    workOrdersButton.initializeWorkOrdersButton(config, account);
  });

  import("./buttons/bills-button.js").then((billsButton) => {
    billsButton.initializeBillsButton(config, account);
  });

  import("./buttons/account-button.js").then((accountButton) => {
    accountButton.initializeAccountButton(config, account);
  });

  import("./buttons/logout-button.js").then((logoutButton) => {
    logoutButton.initializeLogoutButton();
  });
}
