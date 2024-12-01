export function initializeAdminClass(config, account) {
  const adminClass = document.querySelectorAll(".admin");
  const clientClass = document.querySelectorAll(".client");

  if (!account) {
    adminClass.forEach((element) => (element.style.display = "none"));
    clientClass.forEach((element) => (element.style.display = "none"));
    return;
  }

  if (account.admin === 1) {
    adminClass.forEach((element) => (element.style.display = "block"));
    clientClass.forEach((element) => (element.style.display = "none"));
  } else {
    adminClass.forEach((element) => (element.style.display = "none"));
    clientClass.forEach((element) => (element.style.display = "block"));
  }
}
