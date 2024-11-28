export function initializeSideMenu(config) {
  import("./side-menu.js").then((sideMenu) => {
    sideMenu.setAccountHeader(config);
  });
}

export function initializeButtons(config) {
  import("./buttons.js").then((buttons) => {
    buttons.initializeButtons(config);
  });
}

export function initializeClasses(config) {
  import("./classes.js").then((classes) => {
    classes.initializeClasses(config);
  });
}
