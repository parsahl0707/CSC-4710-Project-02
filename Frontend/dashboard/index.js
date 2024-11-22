fetch("/.config.json")
  .then((response) => response.json())
  .then((config) => {
    console.log(config);
    const accountButton = document.getElementById("account");
    accountButton.onclick = () => {
      fetch("http://" + location.hostname + ":" + config.PORT + "/account")
        .then((response) => response.json())
        .then((data) => console.log(data));
    };
  })
  .catch(() => {
    alert('You have not configured ".config.json" properly.');
  });
