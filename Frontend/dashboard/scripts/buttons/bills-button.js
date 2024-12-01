export function initializeBillsButton(config, account) {
  const billsButton = document.getElementById("bills");
  billsButton.onclick = () => {
    setBillsContent(config, account);
  };
}

function setBillsContent(config, account) {
  if (!account) {
    alert("You are not logged in.");
    return;
  }

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
