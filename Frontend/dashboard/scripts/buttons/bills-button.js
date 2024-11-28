export function initializeBillsButton(config) {
  const billsButton = document.getElementById("bills");
  billsButton.onclick = () => {
    setBillsContent(config);
  };
}

function setBillsContent(config) {
  fetch("http://" + location.hostname + ":" + config.PORT + "/billRequests", {
    credentials: "include",
  })
    .then((response) => response.json())
    .then((billRequests) => {
      fetch("/dashboard/components/bills.html")
        .then((response) => response.text())
        .then((content) => {
          const mainContent = document.getElementById("main-content");

          mainContent.innerHTML = content;
        });
    })
    .catch(() => alert("Retrieving bills failed."));
}
