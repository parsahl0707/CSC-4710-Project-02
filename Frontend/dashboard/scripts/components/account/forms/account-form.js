export function initializeAccountForm(config, account) {
  const accountForm = document.getElementById("account-form");

  Object.keys(account).forEach((key) => {
    const element = accountForm.querySelector(`[name='${key}']`);

    if (element) {
      if (element.type === "checkbox" || element.type === "radio") {
        element.checked = account[key] === "on" || acount[key] === true;
      } else if (element.tagName.toLowerCase() === "select") {
        element.value = account[key];
      } else {
        element.value = account[key];
      }
    }
  });
}
