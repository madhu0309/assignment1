const mongoose = require("mongoose");

const schema = mongoose.Schema({
    name: String,
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
})

schema.statics.deleteById = function(_id) {
    return this.deleteOne({ _id: _id })
};

module.exports = mongoose.model("Group", schema);
