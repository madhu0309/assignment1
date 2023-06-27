const { body } = require("express-validator");
const mongoose = require('mongoose');

const createMessageValidation = [
  body("message")
    .notEmpty()
    .trim()
    .isString()
    .withMessage("Message must not be empty"),
  body("groupId").customSanitizer((value) => new mongoose.Types.ObjectId(value)),
];

const likeMessageValidation = [
  body("messageId").customSanitizer((value) => new mongoose.Types.ObjectId(value)),
];

const unLikeMessageValidation = [
  body("messageId").customSanitizer((value) => new mongoose.Types.ObjectId(value)),
];

module.exports = {
  createMessageValidation,
  likeMessageValidation,
  unLikeMessageValidation
};
