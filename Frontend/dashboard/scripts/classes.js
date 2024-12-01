export function initializeClasses(config, account) {
  import("./classes/admin.js").then((admin) => {
    admin.initializeAdminClass(config, account);
  });

  import("./classes/loggedIn.js").then((loggedIn) => {
    loggedIn.initializeLoggedInClass(config, account);
  });
}
