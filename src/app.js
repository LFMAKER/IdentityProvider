const express = require("express");
const mongoose = require("mongoose");
require("dotenv-safe").config();

const cors = require("cors");
const http = require("http");
const routes = require("./routes");

const { ipMiddleware } = require("./middleware/ipfilter");

const app = express();

app.use(ipMiddleware); // IP filter

mongoose.connect(process.env.mongouri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());
app.use(express.json());
app.use(routes);

const server = app.listen(3333);

module.exports = { app, server };
