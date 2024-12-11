export function initializeQuoteResponseForm(config) {
  const quoteResponseForm = document.getElementById("quote-response-form");

  quoteResponseForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(quoteResponseForm);

    const quoteResponse = Object.fromEntries(formData.entries());

    quoteResponse.rejected = quoteResponse.rejected == "on";
    quoteResponse.startDate = quoteResponse.startDate.replace("T", " ");
    quoteResponse.endDate = quoteResponse.endDate.replace("T", " ");

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
      .then((response) => {
        if (!response.ok) {
          response.text().then((text) => alert(text));
        } else {
          window.location.reload();
        }
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
