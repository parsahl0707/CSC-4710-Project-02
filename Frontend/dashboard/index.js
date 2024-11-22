const mainContent = document.getElementById("main-content");

fetch("/.config.json")
  .then((response) => response.json())
  .then((config) => {
    const accountButton = document.getElementById("account");

    accountButton.onclick = () => {
      fetch("http://" + location.hostname + ":" + config.PORT + "/account", {
        credentials: "include",
      })
        .then((response) => response.json())
        .then((account) => {
          fetch("account.html")
            .then((response) => response.text())
            .then((content) => {
              mainContent.innerHTML = content;

              [
                mainContent.querySelector("#account-name").innerHTML,
                mainContent.querySelector("#account-admin").innerHTML,
                mainContent.querySelector("#account-username").innerHTML,
                mainContent.querySelector("#account-street").innerHTML,
                mainContent.querySelector("#account-city").innerHTML,
                mainContent.querySelector("#account-state").innerHTML,
                mainContent.querySelector("#account-zip-code").innerHTML,
                mainContent.querySelector("#account-country").innerHTML,
                mainContent.querySelector("#account-card-number").innerHTML,
                mainContent.querySelector("#account-phone-number").innerHTML,
                mainContent.querySelector("#account-email").innerHTML,
                mainContent.querySelector("#account-register-time").innerHTML,
                mainContent.querySelector("#account-login-time").innerHTML,
              ] = [
                `${account.firstname} ${account.lastname}`,
                account.admin == 1 ? "Admin" : "Client",
                account.username,
                account.street,
                account.city,
                account.state,
                account.zipCode,
                account.country,
                account.cardNumber,
                account.phoneNumber,
                account.email,
                account.registerTime,
                account.loginTime,
              ];
            });
        })
        .catch(() => alert("Error getting account."));
    };
  })
  .catch(() => {
    alert('You have not configured ".config.json" properly.');
  });
