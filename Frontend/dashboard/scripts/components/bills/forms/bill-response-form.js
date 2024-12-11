export function initializeBillResponseForm(config) {
  const billResponseForm = document.getElementById("bill-response-form");

  billResponseForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(billResponseForm);

    const billResponse = Object.fromEntries(formData.entries());

    billResponse.disputed = billResponse.disputed == "on";

    fetch("http://" + location.hostname + ":" + config.PORT + "/billResponse", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(billResponse),
    })
      .then((response) => {
        if (!response.ok) {
          response.text().then((text) => alert(text));
        } else {
          window.location.reload();
        }
      })
      .catch(() => {
        alert("Error creating bill response");
      });
  });

  const disputedCheckbox = billResponseForm.querySelector("#disputed");
  disputedCheckbox.onchange = () => {
    const fields = [billResponseForm.querySelector("#cardNumber")];

    fields.forEach((field) => (field.disabled = disputedCheckbox.checked));
  };
}
