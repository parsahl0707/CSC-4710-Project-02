export function initializeLoggedInClass(config) {
  const loggedInClass = document.querySelectorAll(".logged-in");
  const loggedOutClass = document.querySelectorAll(".logged-out");

  fetch("http://" + location.hostname + ":" + config.PORT + "/account", {
    credentials: "include",
  })
    .then((response) => response.json())
    .then((account) => {
      loggedInClass.forEach((element) => (element.style.display = "block"));
      loggedOutClass.forEach((element) => (element.style.display = "none"));
    })
    .catch(() => {
      loggedInClass.forEach((element) => (element.style.display = "none"));
      loggedOutClass.forEach((element) => (element.style.display = "block"));
    });
}
