const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

const database = require("./database");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
