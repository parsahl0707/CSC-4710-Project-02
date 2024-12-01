export function setAccountHeader(config, account) {
  if (!account) {
    return;
  }

  const sideMenu = document.getElementById("side-menu");

  const accountHeader = sideMenu.querySelector("#account-header");

  accountHeader.innerHTML = `${account.firstname} ${account.lastname} (${
    account.admin == 1 ? "Admin" : "Client"
  })`;
}
