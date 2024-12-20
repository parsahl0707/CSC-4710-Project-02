fetch("/config.json")
  .then((response) => response.json())
  .then((config) => {
    const form = document.getElementById("register-form");

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const formData = new FormData(form);

      const user = Object.fromEntries(formData.entries());

      fetch("http://" + location.hostname + ":" + config.PORT + "/register", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(user),
      })
        .then((response) => {
          if (response.ok) {
            alert("Created user successfully");
            window.location.href = "/login";
          } else {
            response.text().then((text) => alert(text));
          }
        })
        .catch((err) => {
          alert("Error creating user");
        });
    });
  })
  .catch(() => {
    alert('You have not configured "config.json" properly.');
  });
