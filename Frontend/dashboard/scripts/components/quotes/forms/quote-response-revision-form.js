export function initializeQuoteResponseRevisionForm(config) {
  const quoteResponseRevisionForm = document.getElementById(
    "quote-response-revision-form"
  );

  quoteResponseRevisionForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(quoteResponseRevisionForm);

    const quoteResponseRevision = Object.fromEntries(formData.entries());

    quoteResponseRevision.startDate = quoteResponseRevision.startDate.replace(
      "T",
      " "
    );
    quoteResponseRevision.endDate = quoteResponseRevision.endDate.replace(
      "T",
      " "
    );

    fetch(
      "http://" +
        location.hostname +
        ":" +
        config.PORT +
        "/quoteResponseRevision",
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(quoteResponseRevision),
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
        alert("Error creating quote response revision");
      });
  });

  const rejectedCheckbox = quoteResponseRevisionForm.querySelector("#rejected");
  rejectedCheckbox.onchange = () => {
    const fields = [
      quoteResponseRevisionForm.querySelector("#proposedPrice"),
      quoteResponseRevisionForm.querySelector("#startDate"),
      quoteResponseRevisionForm.querySelector("#endDate"),
    ];

    fields.forEach((field) => (field.disabled = rejectedCheckbox.checked));
  };
}
