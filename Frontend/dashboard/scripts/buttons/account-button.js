export function initializeAccountButton(config) {
  const accountButton = document.getElementById("account");
  accountButton.onclick = () => {
    setAccountContent(config);
  };
}

function setAccountContent(config) {
  fetch("http://" + location.hostname + ":" + config.PORT + "/account", {
    credentials: "include",
  })
    .then((response) => response.json())
    .then((account) => {
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
    })
    .catch(() => alert("Login failed. Invalid credentials."));
}
