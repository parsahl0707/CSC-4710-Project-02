export function initializeAdminClass(config) {
  const adminClass = document.querySelectorAll(".admin");
  const clientClass = document.querySelectorAll(".client");

  fetch("http://" + location.hostname + ":" + config.PORT + "/account", {
    credentials: "include",
  })
    .then((response) => response.json())
    .then((account) => {
      if (account.admin === 1) {
        adminClass.forEach((element) => (element.style.display = "block"));
        clientClass.forEach((element) => (element.style.display = "none"));
      } else {
        adminClass.forEach((element) => (element.style.display = "none"));
        clientClass.forEach((element) => (element.style.display = "block"));
      }
    })
    .catch(() => {
      adminClass.forEach((element) => (element.style.display = "none"));
      clientClass.forEach((element) => (element.style.display = "none"));
    });
}
