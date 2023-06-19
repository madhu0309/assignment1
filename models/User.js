const mongoose = require("mongoose");

const schema = mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    role: { type: String, enum: ["user", "admin"], default: "user" },
});

module.exports = mongoose.model("User", schema);
