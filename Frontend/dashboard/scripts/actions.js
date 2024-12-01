export function initializeSideMenu(config, account) {
  import("./side-menu.js").then((sideMenu) => {
    sideMenu.setAccountHeader(config, account);
  });
}

export function initializeButtons(config, account) {
  import("./buttons.js").then((buttons) => {
    buttons.initializeButtons(config, account);
  });
}

export function initializeClasses(config, account) {
  import("./classes.js").then((classes) => {
    classes.initializeClasses(config, account);
  });
}
