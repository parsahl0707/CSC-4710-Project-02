export function initializeAdminClass(config, account) {
  const styleSheet = document.styleSheets[0];

  if (!account) {
    return;
  }

  if (account.admin === 1) {
    styleSheet.insertRule(
      ".admin { display: block; }",
      styleSheet.cssRules.length
    );
    styleSheet.insertRule(
      ".client { display: none; }",
      styleSheet.cssRules.length
    );
  } else {
    styleSheet.insertRule(
      ".admin { display: none; }",
      styleSheet.cssRules.length
    );
    styleSheet.insertRule(
      ".client { display: block; }",
      styleSheet.cssRules.length
    );
  }
}
