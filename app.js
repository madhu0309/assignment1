const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const { MONGO_URL } = require("./config");

const app = express();
app.use(express.json());
app.use("/api", routes);

mongoose
    .connect(MONGO_URL, { useNewUrlParser: true })
    .then(() => {
        console.log("Connected");
});

module.exports = app;
