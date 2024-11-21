const form = document.getElementById("login-form");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(form);

  const [username, password] = Array.from(formData.values());

  fetch("http://" + location.hostname + ":5050/login", {
    method: "POST",
    headers: new Headers({
      Authorization: "Basic " + btoa(username + ":" + password),
    }),
    credentials: "include",
  });
});
