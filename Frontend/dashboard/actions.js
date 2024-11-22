export function getAccount(port) {
  fetch("http://" + location.hostname + ":" + port + "/account", {
    credentials: "include",
  })
    .then((response) => response.json())
    .then((account) => {
      fetch("account.html")
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
    .catch(() => alert("Error getting account."));
}

export function logout() {
  function deleteCookie(name) {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
  }

  const cookies = document.cookie.split(";");

  cookies.forEach(function (cookie) {
    const cookieName = cookie.split("=")[0].trim();
    deleteCookie(cookieName);
  });
}
