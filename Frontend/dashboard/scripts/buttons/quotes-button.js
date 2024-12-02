import { getTableHTML } from "../table.js";

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

      // Quote Request
      const quoteRequestForm = document.getElementById("quote-request-form");

      quoteRequestForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const formData = new FormData(quoteRequestForm);

        const quoteRequest = Object.fromEntries(formData.entries());

        fetch(
          "http://" + location.hostname + ":" + config.PORT + "/quoteRequest",
          {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(quoteRequest),
          }
        )
          .then(() => {
            alert("Created quote request successfully");
            window.location.reload();
          })
          .catch((err) => {
            alert("Error creating quote request");
          });
      });

      // Quote Request Revision
      const quoteRequestRevisionForm = document.getElementById(
        "quote-request-revision-form"
      );

      quoteRequestRevisionForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const formData = new FormData(quoteRequestRevisionForm);

        const quoteRequestRevision = Object.fromEntries(formData.entries());

        fetch(
          "http://" +
            location.hostname +
            ":" +
            config.PORT +
            "/quoteRequestRevision",
          {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(quoteRequestRevision),
          }
        )
          .then(() => {
            alert("Created quote request revision successfully");
            window.location.reload();
          })
          .catch((err) => {
            alert("Error creating quote request revision");
          });
      });

      // Quote Response
      const quoteResponseForm = document.getElementById("quote-response-form");

      quoteResponseForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const formData = new FormData(quoteResponseForm);

        const quoteResponse = Object.fromEntries(formData.entries());

        fetch(
          "http://" + location.hostname + ":" + config.PORT + "/quoteResponse",
          {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(quoteResponse),
          }
        )
          .then(() => {
            alert("Created quote response successfully");
            window.location.reload();
          })
          .catch((err) => {
            alert("Error creating quote response");
          });
      });

      // Quote Response Revision
      const quoteResponseRevisionForm = document.getElementById(
        "quote-response-revision-form"
      );

      quoteResponseRevisionForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const formData = new FormData(quoteResponseRevisionForm);

        const quoteResponseRevision = Object.fromEntries(formData.entries());

        fetch(
          "http://" +
            location.hostname +
            ":" +
            config.PORT +
            "/quoteResponseRevision",
          {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(quoteResponseRevision),
          }
        )
          .then(() => {
            alert("Created quote response revision successfully");
            window.location.reload();
          })
          .catch((err) => {
            alert("Error creating quote response revision");
          });
      });

      // Quote Requests Table
      fetch(
        "http://" + location.hostname + ":" + config.PORT + "/quoteRequests",
        {
          credentials: "include",
        }
      )
        .then((response) => response.json())
        .then((quoteRequests) => {
          const quoteRequestsTable = mainContent.querySelector(
            "#quote-requests-table"
          );

          quoteRequestsTable.innerHTML = getTableHTML(quoteRequests);
        });

      // Quote Responses Table
      fetch(
        "http://" + location.hostname + ":" + config.PORT + "/quoteResponses",
        {
          credentials: "include",
        }
      )
        .then((response) => response.json())
        .then((quoteResponses) => {
          const quoteResponsesTable = mainContent.querySelector(
            "#quote-responses-table"
          );

          quoteResponsesTable.innerHTML = getTableHTML(quoteResponses);
        });

      // Quote Request Revisions Table
      fetch(
        "http://" +
          location.hostname +
          ":" +
          config.PORT +
          "/quoteRequestRevisions",
        {
          credentials: "include",
        }
      )
        .then((response) => response.json())
        .then((quoteRequestRevisions) => {
          const quoteRequestRevisionsTable = mainContent.querySelector(
            "#quote-request-revisions-table"
          );

          quoteRequestRevisionsTable.innerHTML = getTableHTML(
            quoteRequestRevisions
          );
        });

      // Quote Response Revisions Table
      fetch(
        "http://" +
          location.hostname +
          ":" +
          config.PORT +
          "/quoteResponseRevisions",
        {
          credentials: "include",
        }
      )
        .then((response) => response.json())
        .then((quoteResponseRevisions) => {
          const quoteResponseRevisionsTable = mainContent.querySelector(
            "#quote-response-revisions-table"
          );

          quoteResponseRevisionsTable.innerHTML = getTableHTML(
            quoteResponseRevisions
          );
        });
    });
}
