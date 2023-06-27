const express = require("express");
const mongoose = require("mongoose");
var cookieParser = require('cookie-parser')
const userRoutes = require("./routes/user.route");
const messageRoutes = require("./routes/message.route");
const groupRoutes = require("./routes/group.route");
const { MONGO_URL } = require("./config");

const app = express();
app.use(cookieParser())
app.use(express.json());
app.use("/api", userRoutes);
app.use("/api", groupRoutes);
app.use("/api", messageRoutes);

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
