export function initializeLoggedInClass(config, account) {
  const loggedInClass = document.querySelectorAll(".logged-in");
  const loggedOutClass = document.querySelectorAll(".logged-out");

  if (account) {
    loggedInClass.forEach((element) => (element.style.display = "block"));
    loggedOutClass.forEach((element) => (element.style.display = "none"));
  } else {
    loggedInClass.forEach((element) => (element.style.display = "none"));
    loggedOutClass.forEach((element) => (element.style.display = "block"));
  }
}
