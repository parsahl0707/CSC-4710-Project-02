export function initializeWorkOrdersButton(config, account) {
  const workOrdersButton = document.getElementById("work-orders");
  workOrdersButton.onclick = () => {
    setWorkOrdersContent(config, account);
  };
}

function setWorkOrdersContent(config, account) {
  if (!account) {
    alert("You are not logged in.");
    return;
  }

  fetch("http://" + location.hostname + ":" + config.PORT + "/workOrders", {
    credentials: "include",
  })
    .then((response) => response.json())
    .then((workOrders) => {
      fetch("/dashboard/components/work-orders.html")
        .then((response) => response.text())
        .then((content) => {
          const mainContent = document.getElementById("main-content");

          mainContent.innerHTML = content;
        });
    })
    .catch(() => alert("Retrieving work orders failed."));
}
