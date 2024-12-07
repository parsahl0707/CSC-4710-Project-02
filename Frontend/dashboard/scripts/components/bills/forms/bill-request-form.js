export function initializeBillRequestForm(config) {
  const billRequestForm = document.getElementById("bill-request-form");

  billRequestForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(billRequestForm);

    const billRequest = Object.fromEntries(formData.entries());

    fetch("http://" + location.hostname + ":" + config.PORT + "/billRequest", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(billRequest),
    })
      .then((response) => {
        if (!response.ok) {
          response.text().then((text) => alert(text));
        } else {
          window.location.reload();
        }
      })
      .catch(() => {
        alert("Error creating bill request");
      });
  });
}
