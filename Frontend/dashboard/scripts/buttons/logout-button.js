export function initializeLogoutButton() {
  const logoutButton = document.getElementById("logout");
  logoutButton.onclick = () => {
    logout();
    window.location.href = "/";
  };
}

function logout() {
  function deleteCookie(name) {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
  }

  const cookies = document.cookie.split(";");

  cookies.forEach(function (cookie) {
    const cookieName = cookie.split("=")[0].trim();
    deleteCookie(cookieName);
  });
}
