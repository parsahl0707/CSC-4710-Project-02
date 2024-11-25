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
        sameSite: "None",
      });

      response.cookie("password", password, {
        maxAge: process.env.COOKIE_LIFETIME,
        sameSite: "None",
      });

      response.json(data);
    })
    .catch((err) => {
      response.status(500).send(err.toString());
    });
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
    .catch((err) => {
      response.status(500).send(err.toString());
    });
});

// Quotes
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

// Quotes
app.post("/quoteRequests", (request, response) => {
  const [username, password] = [
    request.cookies.username,
    request.cookies.password,
  ];

  database
    .postQuoteRequests(username, password, request.body)
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
