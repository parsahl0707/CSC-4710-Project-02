export function initializeBillRequestRevisionForm(config) {
  const billRequestRevisionForm = document.getElementById(
    "bill-request-revision-form"
  );

  billRequestRevisionForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(billRequestRevisionForm);

    const billRequestRevision = Object.fromEntries(formData.entries());

    fetch(
      "http://" +
        location.hostname +
        ":" +
        config.PORT +
        "/billRequestRevision",
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(billRequestRevision),
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
        alert("Error creating bill request revision");
      });
  });
}
