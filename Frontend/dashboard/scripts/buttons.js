import { initializeQuotesButton } from "/dashboard/scripts/buttons/quotes-button.js";
import { initializeWorkOrdersButton } from "/dashboard/scripts/buttons/work-orders-button.js";
import { initializeBillsButton } from "/dashboard/scripts/buttons/bills-button.js";
import { initializeAccountButton } from "/dashboard/scripts/buttons/account-button.js";
import { initializeLogoutButton } from "/dashboard/scripts/buttons/logout-button.js";

export function initializeButtons(config, account) {
  initializeQuotesButton(config, account);
  initializeWorkOrdersButton(config, account);
  initializeBillsButton(config, account);
  initializeAccountButton(config, account);
  initializeLogoutButton();
}
