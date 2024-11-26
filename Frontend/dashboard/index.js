import("./actions.js").then((actions) => {
  fetch("/.config.json")
    .then((response) => response.json())
    .then((config) => {
      actions.initializeSideMenu(config);

      const quoteButton = document.getElementById("quotes");
      quoteButton.onclick = () => {
        actions.setQuotesContent(config);
      };

      const workOrdersButton = document.getElementById("work-orders");
      workOrdersButton.onclick = () => {
        actions.setWorkOrdersContent(config);
      };

      const billsButton = document.getElementById("bills");
      billsButton.onclick = () => {
        actions.setBillsContent(config);
      };

      const accountButton = document.getElementById("account");
      accountButton.onclick = () => {
        actions.setAccountContent(config);
      };

      const logoutButton = document.getElementById("logout");
      logoutButton.onclick = () => {
        actions.logout();
        window.location.href = "/";
      };
    })
    .catch(() => {
      alert('You have not configured ".config.json" properly.');
    });
});
