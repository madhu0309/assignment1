const { body } = require("express-validator");

const createUserValidation = [
  body("name")
    .notEmpty()
    .trim()
    .isString()
    .withMessage("Name must not be empty"),
  body("email")
    .notEmpty()
    .trim()
    .isEmail()
    .withMessage("Email must be a valid email")
    .normalizeEmail()
    .toLowerCase(),
  body("password")
    .notEmpty()
    .trim()
    .isLength(2)
    .withMessage("Password length short, min 2 char required"),
];

const updateUserValidation = [
  body("name")
    .optional()
    .trim()
    .isString()
    .withMessage("Name must not be empty"),
  body("email")
    .optional()
    .trim()
    .isEmail()
    .withMessage("Email must be a valid email")
    .normalizeEmail()
    .toLowerCase(),
  body("password")
    .optional()
    .trim()
    .isLength(2)
    .withMessage("Password length short, min 2 char required"),
];

const loginUserValidation = [
  body("email")
    .notEmpty()
    .trim()
    .isEmail()
    .withMessage("Email must be a valid email")
    .normalizeEmail()
    .toLowerCase(),
  body("password")
    .notEmpty()
    .trim()
    .isLength(2)
    .withMessage("Password length short, min 2 char required"),
];

module.exports = {
  createUserValidation,
  updateUserValidation,
  loginUserValidation,
};
