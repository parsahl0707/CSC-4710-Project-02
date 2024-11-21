const form = document.getElementById("register-form");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(form);

  const user = Object.fromEntries(formData.entries());

  console.log(user);

  fetch("http://" + location.hostname + ":5050/register", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then(() => {
      alert("Created user successfully");
      window.location.href = "../login";
    })
    .catch((err) => {
      alert("Error creating user");
    });
});
