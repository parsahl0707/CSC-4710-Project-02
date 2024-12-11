export function initializeQuoteRequestRevisionForm(config) {
  const quoteRequestRevisionForm = document.getElementById(
    "quote-request-revision-form"
  );

  quoteRequestRevisionForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(quoteRequestRevisionForm);

    const quoteRequestRevision = Object.fromEntries(formData.entries());

    quoteRequestRevision.accepted = quoteRequestRevision.accepted == "on";

    fetch(
      "http://" +
        location.hostname +
        ":" +
        config.PORT +
        "/quoteRequestRevision",
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(quoteRequestRevision),
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
        alert("Error creating quote request revision");
      });
  });

  const acceptedCheckbox = quoteRequestRevisionForm.querySelector("#accepted");
  acceptedCheckbox.onchange = () => {
    const fields = [quoteRequestRevisionForm.querySelector("#note")];

    fields.forEach((field) => (field.disabled = acceptedCheckbox.checked));
  };
}
