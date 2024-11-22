import config from "/config.json" with { type: "json" };

const accountButton = document.getElementById("account");
accountButton.onclick = () => {
  fetch("http://" + location.hostname + ":" + config.PORT + "/account")
    .then((response) => response.json())
    .then((data) => console.log(data));
};
