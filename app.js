const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");

const app = express();
app.use(express.json());
app.use("/api", routes);

mongoose
    .connect("mongodb://localhost:27017/riktam", { useNewUrlParser: true })
    .then(() => {
        console.log("Connected");
});

module.exports = app;
