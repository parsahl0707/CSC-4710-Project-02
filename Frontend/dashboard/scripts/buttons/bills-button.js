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

  fetch("/dashboard/components/bills.html")
    .then((response) => response.text())
    .then((content) => {
      const mainContent = document.getElementById("main-content");

      mainContent.innerHTML = content;
    });
}
