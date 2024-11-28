export function setAccountHeader(config) {
  fetch("http://" + location.hostname + ":" + config.PORT + "/account", {
    credentials: "include",
  })
    .then((response) => response.json())
    .then((account) => {
      const sideMenu = document.getElementById("side-menu");

      const accountHeader = sideMenu.querySelector("#account-header");

      accountHeader.innerHTML = `${account.firstname} ${account.lastname} (${
        account.admin == 1 ? "Admin" : "Client"
      })`;
    });
}
