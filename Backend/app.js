import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import * as database from "./dummy-database.js";
import * as utils from "./utils/utils.js";

dotenv.config();

const app = express();

app.use(cors({ credentials: true, origin: "http://localhost:8000" }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Authentication
app.post("/register", (request, response) => {
  database
    .register(request.body)
    .then((data) => response.json(data))
    .catch((err) => response.status(500).send(err.toString()));
});

app.post("/login", (request, response) => {
  const [username, password] = utils.getCredentialsFromAuthHeaders(
    request.headers.authorization
  );

  database
    .login(username, password)
    .then((data) => {
      response.cookie("username", username, {
        maxAge: process.env.COOKIE_LIFETIME,
        sameSite: "strict",
      });

      response.cookie("password", password, {
        maxAge: process.env.COOKIE_LIFETIME,
        sameSite: "strict",
      });

      response.json(data);
    })
    .catch((err) => {
      response.status(500).send(err.toString());
    });
});

app.get("/logout", (request, response) => {
  response.clearCookie("username", {
    sameSite: "strict",
  });
  response.clearCookie("password", {
    sameSite: "strict",
  });
  response.send();
});

// Account
app.get("/account", (request, response) => {
  const [username, password] = [
    request.cookies.username,
    request.cookies.password,
  ];

  database
    .getAccount(username, password)
    .then((data) => {
      response.json(data);
    })
    .catch(() => {
      response.status(401).send();
    });
});

// Quote Requests
app.get("/quoteRequests", (request, response) => {
  const [username, password] = [
    request.cookies.username,
    request.cookies.password,
  ];

  database
    .getQuoteRequests(username, password)
    .then((data) => {
      response.json(data);
    })
    .catch((err) => {
      response.status(500).send(err.toString());
    });
});

app.post("/quoteRequest", (request, response) => {
  const [username, password] = [
    request.cookies.username,
    request.cookies.password,
  ];

  database
    .postQuoteRequest(username, password, request.body)
    .then((data) => {
      response.json(data);
    })
    .catch((err) => {
      response.status(500).send(err.toString());
    });
});

// Quote Responses
app.get("/quoteResponses", (request, response) => {
  const [username, password] = [
    request.cookies.username,
    request.cookies.password,
  ];

  database
    .getQuoteResponses(username, password)
    .then((data) => {
      response.json(data);
    })
    .catch((err) => {
      response.status(500).send(err.toString());
    });
});

app.post("/quoteResponse", (request, response) => {
  const [username, password] = [
    request.cookies.username,
    request.cookies.password,
  ];

  database
    .postQuoteResponse(username, password, request.body)
    .then((data) => {
      response.json(data);
    })
    .catch((err) => response.status(500).send(err.toString()));
});

// Quote Request Revisions
app.get("/quoteRequestRevisions", (request, response) => {
  const [username, password] = [
    request.cookies.username,
    request.cookies.password,
  ];

  database
    .getQuoteRequestRevisions(username, password)
    .then((data) => {
      response.json(data);
    })
    .catch((err) => {
      response.status(500).send(err.toString());
    });
});

app.post("/quoteRequestRevision", (request, response) => {
  const [username, password] = [
    request.cookies.username,
    request.cookies.password,
  ];

  database
    .postQuoteRequestRevision(username, password, request.body)
    .then((data) => {
      response.json(data);
    })
    .catch((err) => {
      response.status(500).send(err.toString());
    });
});

// Quote Response Revisions
app.get("/quoteResponseRevisions", (request, response) => {
  const [username, password] = [
    request.cookies.username,
    request.cookies.password,
  ];

  database
    .getQuoteResponseRevisions(username, password)
    .then((data) => {
      response.json(data);
    })
    .catch((err) => {
      response.status(500).send(err.toString());
    });
});

app.post("/quoteResponseRevision", (request, response) => {
  const [username, password] = [
    request.cookies.username,
    request.cookies.password,
  ];

  database
    .postQuoteResponseRevision(username, password, request.body)
    .then((data) => {
      response.json(data);
    })
    .catch((err) => {
      response.status(500).send(err.toString());
    });
});

// Work Orders
app.get("/workOrders", (request, response) => {
  const [username, password] = [
    request.cookies.username,
    request.cookies.password,
  ];

  database
    .getWorkOrders(username, password)
    .then((data) => {
      response.json(data);
    })
    .catch((err) => {
      response.status(500).send(err.toString());
    });
});

// Bill Requests
app.get("/billRequests", (request, response) => {
  const [username, password] = [
    request.cookies.username,
    request.cookies.password,
  ];

  database
    .getBillRequests(username, password)
    .then((data) => {
      response.json(data);
    })
    .catch((err) => {
      response.status(500).send(err.toString());
    });
});

app.post("/billRequest", (request, response) => {
  const [username, password] = [
    request.cookies.username,
    request.cookies.password,
  ];

  database
    .postBillRequest(username, password, request.body)
    .then((data) => {
      response.json(data);
    })
    .catch((err) => {
      response.status(500).send(err.toString());
    });
});

// Bill Responses
app.get("/billResponses", (request, response) => {
  const [username, password] = [
    request.cookies.username,
    request.cookies.password,
  ];

  database
    .getBillResponses(username, password)
    .then((data) => {
      response.json(data);
    })
    .catch((err) => {
      response.status(500).send(err.toString());
    });
});

app.post("/billResponse", (request, response) => {
  const [username, password] = [
    request.cookies.username,
    request.cookies.password,
  ];

  database
    .postBillResponse(username, password, request.body)
    .then((data) => {
      response.json(data);
    })
    .catch((err) => response.status(500).send(err.toString()));
});

// Bill Request Revisions
app.get("/billRequestRevisions", (request, response) => {
  const [username, password] = [
    request.cookies.username,
    request.cookies.password,
  ];

  database
    .getBillRequestRevisions(username, password)
    .then((data) => {
      response.json(data);
    })
    .catch((err) => {
      response.status(500).send(err.toString());
    });
});

app.post("/billRequestRevision", (request, response) => {
  const [username, password] = [
    request.cookies.username,
    request.cookies.password,
  ];

  database
    .postBillRequestRevision(username, password, request.body)
    .then((data) => {
      response.json(data);
    })
    .catch((err) => {
      response.status(500).send(err.toString());
    });
});

// Bill Response Revisions
app.get("/billResponseRevisions", (request, response) => {
  const [username, password] = [
    request.cookies.username,
    request.cookies.password,
  ];

  database
    .getBillResponseRevisions(username, password)
    .then((data) => {
      response.json(data);
    })
    .catch((err) => {
      response.status(500).send(err.toString());
    });
});

app.post("/billResponseRevision", (request, response) => {
  const [username, password] = [
    request.cookies.username,
    request.cookies.password,
  ];

  database
    .postBillResponseRevision(username, password, request.body)
    .then((data) => {
      response.json(data);
    })
    .catch((err) => {
      response.status(500).send(err.toString());
    });
});

app.listen(process.env.PORT, () => {
  console.log(`Listening on port: ${process.env.PORT}.`);
  console.log(`Current database: ${database.info}`);
});
