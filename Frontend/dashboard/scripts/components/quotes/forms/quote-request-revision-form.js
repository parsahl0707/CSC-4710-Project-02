export function initializeQuoteRequestRevisionForm(config) {
  const quoteRequestRevisionForm = document.getElementById(
    "quote-request-revision-form"
  );

  quoteRequestRevisionForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(quoteRequestRevisionForm);

    const quoteRequestRevision = Object.fromEntries(formData.entries());

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
      .then(() => {
        window.location.reload();
      })
      .catch(() => {
        alert("Error creating quote request revision");
      });
  });

  const acceptedCheckbox = quoteRequestRevisionForm.querySelector("#accepted");
  acceptedCheckbox.onchange = () => {
    const noteField = quoteRequestRevisionForm.querySelector("#note");

    noteField.disabled = acceptedCheckbox.checked;
  };
}
