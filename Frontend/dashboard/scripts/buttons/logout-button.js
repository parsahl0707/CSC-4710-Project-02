export function initializeLogoutButton(config, account) {
  const logoutButton = document.getElementById("logout");

  logoutButton.onclick = () => {
    fetch("http://" + location.hostname + ":" + config.PORT + "/logout", {
      credentials: "include",
    }).then(() => {
      window.location.href = "/";
    });
  };
}
