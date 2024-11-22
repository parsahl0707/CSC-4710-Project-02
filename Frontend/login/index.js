import config from "/config.json" with { type: "json" };

const form = document.getElementById("login-form");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(form);

  const [username, password] = Array.from(formData.values());

  fetch("http://" + location.hostname + ":" + config.PORT + "/login", {
    method: "POST",
    headers: new Headers({
      Authorization: "Basic " + btoa(username + ":" + password),
    }),
    credentials: "include",
  }).then((response) => console.log("Success"));
});
