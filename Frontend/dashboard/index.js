import("./actions.js").then((actions) => {
  fetch("/.config.json")
    .then((response) => response.json())
    .then((config) => {
      actions.getAccount(config.PORT);

      const accountButton = document.getElementById("account");
      accountButton.onclick = () => {
        actions.getAccount(config.PORT);
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
