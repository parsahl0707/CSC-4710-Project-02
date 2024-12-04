import { initializeQuoteRequestForm } from "/dashboard/scripts/components/quotes/forms/quote-request-form.js";
import { initializeQuoteRequestRevisionForm } from "/dashboard/scripts/components/quotes/forms/quote-request-revision-form.js";
import { initializeQuoteResponseForm } from "/dashboard/scripts/components/quotes/forms/quote-response-form.js";
import { initializeQuoteResponseRevisionForm } from "/dashboard/scripts/components/quotes/forms/quote-response-revision-form.js";

import { initializeQuoteRequestsTable } from "/dashboard/scripts/components/quotes/tables/quote-requests-table.js";
import { initializeQuoteRequestRevisionsTable } from "/dashboard/scripts/components/quotes/tables/quote-request-revisions-table.js";
import { initializeQuoteResponsesTable } from "/dashboard/scripts/components/quotes/tables/quote-responses-table.js";
import { initializeQuoteResponseRevisionsTable } from "/dashboard/scripts/components/quotes/tables/quote-response-revisions-table.js";

export function initializeQuotesButton(config, account) {
  const quoteButton = document.getElementById("quotes");
  quoteButton.onclick = () => {
    setQuotesContent(config, account);
  };
}

function setQuotesContent(config, account) {
  if (!account) {
    alert("You are not logged in.");
    return;
  }

  fetch("/dashboard/components/quotes.html")
    .then((response) => response.text())
    .then((content) => {
      const mainContent = document.getElementById("main-content");

      mainContent.innerHTML = content;

      initializeQuoteRequestForm(config);
      initializeQuoteRequestRevisionForm(config);
      initializeQuoteResponseForm(config);
      initializeQuoteResponseRevisionForm(config);

      initializeQuoteRequestsTable(config);
      initializeQuoteRequestRevisionsTable(config);
      initializeQuoteResponsesTable(config);
      initializeQuoteResponseRevisionsTable(config);
    });
}
