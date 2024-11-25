import("./actions.js").then((actions) => {
  fetch("/.config.json")
    .then((response) => response.json())
    .then((config) => {
      actions.setAccountInformation(config);
      actions.setAccountHeader(config);

      const accountButton = document.getElementById("account");
      accountButton.onclick = () => {
        actions.setAccountInformation(config);
      };
      const logoutButton = document.getElementById("logout");
      logoutButton.onclick = () => {
        actions.logout();
        window.location.href = "/";
      };
    })
    .catch(() => {
      alert('You have not configured ".config.json" properly.');
    });
});
