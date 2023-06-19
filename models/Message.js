const mongoose = require("mongoose");

const schema = mongoose.Schema({
    message: String,
    userId: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'},
    groupId: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Group'},
    likes: [{ type: mongoose.Schema.Types.ObjectId }],
    createdAt: {type: Date, required: true, default: Date.now()},
});

module.exports = mongoose.model("Message", schema);
