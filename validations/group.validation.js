const { body } = require("express-validator");

const groupMemberValidation = [
  body("userId").notEmpty().isMongoId().withMessage("Invalid id"),
];


module.exports = {
    groupMemberValidation,
};
