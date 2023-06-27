const { body } = require("express-validator");

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
