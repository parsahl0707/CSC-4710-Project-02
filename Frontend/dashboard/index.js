import("./scripts/actions.js").then((actions) => {
  fetch("/.config.json")
    .then((response) => response.json())
    .then((config) => {
      fetch("http://" + location.hostname + ":" + config.PORT + "/account", {
        credentials: "include",
      })
        .then((response) => response.json())
        .catch(() => {})
        .then((account) => {
          actions.initializeSideMenu(config, account);
          actions.initializeButtons(config, account);
          actions.initializeClasses(config, account);
        });
    })
    .catch((err) =>
      alert('You may have not configured ".config.json" properly.')
    );
});
