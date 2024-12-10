import { getTableHTML } from "/dashboard/scripts/table.js";

export function initializeUsersTable(config) {
  fetch("http://" + location.hostname + ":" + config.PORT + "/allAccounts", {
    credentials: "include",
  })
    .then((response) => response.json())
    .then((users) => {
      const usersTable = document.getElementById("users-table");

      usersTable.innerHTML = getTableHTML(users);
    });
}
