export function initializeWorkOrdersButton(config) {
  const workOrdersButton = document.getElementById("work-orders");
  workOrdersButton.onclick = () => {
    setWorkOrdersContent(config);
  };
}

function setWorkOrdersContent(config) {
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
