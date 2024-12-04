import { initializeAdminClass } from "/dashboard/scripts/classes/admin.js";
import { initializeLoggedInClass } from "/dashboard/scripts/classes/loggedIn.js";

export function initializeClasses(config, account) {
  initializeAdminClass(config, account);
  initializeLoggedInClass(config, account);
}
