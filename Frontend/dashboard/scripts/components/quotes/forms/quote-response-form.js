export function initializeQuoteResponseForm(config) {
  const quoteResponseForm = document.getElementById("quote-response-form");

  quoteResponseForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(quoteResponseForm);

    const quoteResponse = Object.fromEntries(formData.entries());

    fetch(
      "http://" + location.hostname + ":" + config.PORT + "/quoteResponse",
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(quoteResponse),
      }
    )
      .then(() => {
        window.location.reload();
      })
      .catch(() => {
        alert("Error creating quote response");
      });
  });

  const rejectedCheckbox = quoteResponseForm.querySelector("#rejected");
  rejectedCheckbox.onchange = () => {
    const fields = [
      quoteResponseForm.querySelector("#proposedPrice"),
      quoteResponseForm.querySelector("#startDate"),
      quoteResponseForm.querySelector("#endDate"),
    ];

    fields.forEach((field) => (field.disabled = rejectedCheckbox.checked));
  };
}
