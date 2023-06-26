const { body, check } = require("express-validator");
var mongoose = require("mongoose");

const createMessageValidation = [
  body("message")
    .notEmpty()
    .trim()
    .isString()
    .withMessage("Message must not be empty"),
  body("groupId").notEmpty().isMongoId(),
];

const likeMessageValidation = [
  body("messageId").notEmpty().isMongoId(),
];

module.exports = {
  createMessageValidation,
  likeMessageValidation,
};
