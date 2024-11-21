import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import * as database from "./dummy-database.js";
import * as utils from "./utils.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.post("/register", (request, response) => {
  database
    .register(request.body)
    .then((data) => response.json(data))
    .catch((err) => response.status(500).send("Registering failed."));
});

app.post("/login", (request, response) => {
  const [username, password] = utils.getCredentialsFromAuthHeaders(
    request.headers.authorization
  );

  if (username == null || password == null) {
    response.status(400).send("Incomplete login credentials provided.");
    return;
  }

  database
    .login(username, password)
    .then((data) => {
      response.cookie("username", username, {
        maxAge: process.env.COOKIE_LIFETIME,
        httpOnly: true,
      });
      response.cookie("password", password, {
        maxAge: process.env.COOKIE_LIFETIME,
        httpOnly: true,
      });
      response.status(200).send(data);
    })
    .catch((err) => {
      response.status(401).send(err.toString());
    });
});

app.listen(process.env.PORT, () => {
  console.log(`Listening on port: ${process.env.PORT}.`);
  console.log(`Current database: ${database.info}`);
});
