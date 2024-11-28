import("./scripts/actions.js").then((actions) => {
  fetch("/.config.json")
    .then((response) => response.json())
    .then((config) => {
      actions.initializeSideMenu(config);

      actions.initializeButtons(config);

      actions.initializeClasses(config);
    })
    .catch((err) => {
      alert('You may have not configured ".config.json" properly.');
      console.log(err);
    });
});
