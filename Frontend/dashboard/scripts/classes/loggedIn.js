export function initializeLoggedInClass(config, account) {
  const styleSheet = document.styleSheets[0];

  if (!account) {
    styleSheet.insertRule(
      ".logged-in { display: none; }",
      styleSheet.cssRules.length
    );
    styleSheet.insertRule(
      ".logged-out { display: block; }",
      styleSheet.cssRules.length
    );
  } else {
    styleSheet.insertRule(
      ".logged-in { display: block; }",
      styleSheet.cssRules.length
    );
    styleSheet.insertRule(
      ".logged-out { display: none; }",
      styleSheet.cssRules.length
    );
  }
}
