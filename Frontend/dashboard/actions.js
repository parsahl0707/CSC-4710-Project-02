export function setAccountHeader(config) {
  fetch("http://" + location.hostname + ":" + config.PORT + "/account", {
    credentials: "include",
  })
    .then((response) => response.json())
    .then((account) => {
      const sideMenu = document.getElementById("side-menu");

      const accountHeader = sideMenu.querySelector("#account-header");

      accountHeader.innerHTML = `${account.firstname} ${account.lastname} (${
        account.admin == 1 ? "Admin" : "Client"
      })`;
    })
    .catch(() => {});
}

export function setQuotesContent(config) {
  fetch("http://" + location.hostname + ":" + config.PORT + "/quoteRequests", {
    credentials: "include",
  })
    .then((response) => response.json())
    .then((quoteRequests) => {
      fetch("quotes.html")
        .then((response) => response.text())
        .then((content) => {
          const mainContent = document.getElementById("main-content");

          mainContent.innerHTML = content;

          const quoteRequestsTable = mainContent.querySelector(
            "#quote-requests-table tbody"
          );

          if (quoteRequests.length === 0) {
            quoteRequestsTable.innerHTML =
              "<tr><td class='no-data' colspan='5'>No Data</td></tr>";
            return;
          } else {
            let tableHtml = "";
            for (const element of quoteRequests) {
              tableHtml += "<tr>";
              for (const key in element) {
                tableHtml += `<td>${
                  element[key] == null ? "-" : element[key]
                }</td>`;
              }
              tableHtml += "</tr>";
            }

            quoteRequestsTable.innerHTML = tableHtml;
          }
        });
    })
    .catch(() => alert("Retrieving quotes failed."));
}

export function setWorkOrdersContent(config) {
  fetch("http://" + location.hostname + ":" + config.PORT + "/workOrders", {
    credentials: "include",
  })
    .then((response) => response.json())
    .then((workOrders) => {
      fetch("work-orders.html")
        .then((response) => response.text())
        .then((content) => {
          const mainContent = document.getElementById("main-content");

          mainContent.innerHTML = content;
        });
    })
    .catch(() => alert("Retrieving work orders failed."));
}

export function setBillsContent(config) {
  fetch("http://" + location.hostname + ":" + config.PORT + "/billRequests", {
    credentials: "include",
  })
    .then((response) => response.json())
    .then((billRequests) => {
      fetch("bills.html")
        .then((response) => response.text())
        .then((content) => {
          const mainContent = document.getElementById("main-content");

          mainContent.innerHTML = content;
        });
    })
    .catch(() => alert("Retrieving bills failed."));
}

export function setAccountContent(config) {
  fetch("http://" + location.hostname + ":" + config.PORT + "/account", {
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
    .catch(() => alert("Login failed. Invalid credentials."));
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
