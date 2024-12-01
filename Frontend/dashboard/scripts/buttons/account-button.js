export function initializeAccountButton(config, account) {
  const accountButton = document.getElementById("account");
  accountButton.onclick = () => {
    setAccountContent(config, account);
  };
}

function setAccountContent(config, account) {
  if (!account) {
    alert("You are not logged in.");
    return;
  }

  fetch("/dashboard/components/account.html")
    .then((response) => response.text())
    .then((content) => {
      const mainContent = document.getElementById("main-content");

      mainContent.innerHTML = content;

      const form = mainContent.querySelector("#account-form");

      Object.keys(account).forEach((key) => {
        const element = form.querySelector(`[name='${key}']`);

        if (element) {
          if (element.type === "checkbox" || element.type === "radio") {
            element.checked = account[key] === "on" || acount[key] === true;
          } else if (element.tagName.toLowerCase() === "select") {
            element.value = account[key];
          } else {
            element.value = account[key];
          }
        }
      });
    });
}
