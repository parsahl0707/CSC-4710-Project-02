export function initializeQuoteRequestForm(config) {
  const quoteRequestForm = document.getElementById("quote-request-form");

  quoteRequestForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(quoteRequestForm);

    const quoteRequest = Object.fromEntries(formData.entries());

    fetch("http://" + location.hostname + ":" + config.PORT + "/quoteRequest", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(quoteRequest),
    })
      .then((response) => {
        if (!response.ok) {
          response.text().then((text) => alert(text));
        } else {
          window.location.reload();
        }
      })
      .catch(() => {
        alert("Error creating quote request");
      });
  });
}
