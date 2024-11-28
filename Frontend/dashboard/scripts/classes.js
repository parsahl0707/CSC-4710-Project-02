export function initializeClasses(config) {
  import("./classes/admin.js").then((admin) => {
    admin.initializeAdminClass(config);
  });

  import("./classes/loggedIn.js").then((loggedIn) => {
    loggedIn.initializeLoggedInClass(config);
  });
}
