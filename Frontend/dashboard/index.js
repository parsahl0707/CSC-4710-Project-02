import { setAccountHeader } from "/dashboard/scripts/side-menu.js";
import { initializeButtons } from "/dashboard/scripts/buttons.js";
import { initializeClasses } from "/dashboard/scripts/classes.js";

fetch("/config.json")
  .then((response) => response.json())
  .then((config) => {
    fetch("http://" + location.hostname + ":" + config.PORT + "/account", {
      credentials: "include",
    })
      .then((response) => response.json())
      .catch(() => {})
      .then((account) => {
        setAccountHeader(config, account);
        initializeButtons(config, account);
        initializeClasses(config, account);
      });
  })
  .catch(() => alert('You may have not configured "config.json" properly.'));
