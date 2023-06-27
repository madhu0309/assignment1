const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { JWT_SECTRET_KEY } = require("../config");

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    token: { type: String },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        delete ret.__v;
      },
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.comparepassword = function (password) {
  return bcrypt.compare(password, this.password);
};

userSchema.methods.generateToken = function () {
  var user = this;
  var token = jwt.sign(user._id.toHexString(), JWT_SECTRET_KEY);

  user.token = token;
  return user.save();
};

userSchema.statics.findByToken = function (token) {
  var user = this;
  let decode = jwt.verify(token, JWT_SECTRET_KEY);
  return user.findOne({ _id: decode, token: token });
};

module.exports = mongoose.model("User", userSchema);
