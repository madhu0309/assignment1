const express = require("express");
const mongoose = require("mongoose");
var cookieParser = require('cookie-parser')
const routes = require("./routes");
const { MONGO_URL } = require("./config");

const app = express();
app.use(cookieParser())
app.use(express.json());
app.use("/api", routes);

// database connection
mongoose.Promise=global.Promise;
mongoose
  .connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected");
  }).catch(error => {
    console.log(error);
  });

module.exports = app;
