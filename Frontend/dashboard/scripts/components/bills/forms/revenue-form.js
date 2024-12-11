export function initializeRevenueForm(config) {
  const revenueForm = document.getElementById("revenue-form");

  revenueForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(revenueForm);

    const dateData = Object.fromEntries(formData.entries());

    fetch("http://" + location.hostname + ":" + config.PORT + "/revenue", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(dateData),
    })
      .then((response) => {
        if (response.ok) {
          response.text().then((text) => alert("Total revenue: " + text));
        }
      })
      .catch((err) => {
        alert(err);
      });
  });
}
