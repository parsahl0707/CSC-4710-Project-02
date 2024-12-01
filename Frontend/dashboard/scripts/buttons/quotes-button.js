export function initializeQuotesButton(config, account) {
  const quoteButton = document.getElementById("quotes");
  quoteButton.onclick = () => {
    setQuotesContent(config, account);
  };
}

function setQuotesContent(config, account) {
  if (!account) {
    alert("You are not logged in.");
    return;
  }

  fetch("http://" + location.hostname + ":" + config.PORT + "/quoteRequests", {
    credentials: "include",
  })
    .then((response) => response.json())
    .then((quoteRequests) => {
      fetch("/dashboard/components/quotes.html")
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
