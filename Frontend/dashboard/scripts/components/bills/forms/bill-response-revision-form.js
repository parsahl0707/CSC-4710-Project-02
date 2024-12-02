export function initializeBillResponseRevisionForm(config) {
  const billResponseRevisionForm = document.getElementById(
    "bill-response-revision-form"
  );

  billResponseRevisionForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(billResponseRevisionForm);

    const billResponseRevision = Object.fromEntries(formData.entries());

    fetch(
      "http://" +
        location.hostname +
        ":" +
        config.PORT +
        "/billResponseRevision",
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(billResponseRevision),
      }
    )
      .then(() => {
        window.location.reload();
      })
      .catch(() => {
        alert("Error creating bill response revision");
      });
  });

  const disputedCheckbox = billResponseRevisionForm.querySelector("#disputed");
  disputedCheckbox.onchange = () => {
    const fields = [billResponseRevisionForm.querySelector("#cardNumber")];

    fields.forEach((field) => (field.disabled = disputedCheckbox.checked));
  };
}
