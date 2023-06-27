const express = require("express");
const {
  createMessageValidation,
  likeMessageValidation,
} = require("../validations/message.validation");
const messageController = require("../controllers/message.controller");
const auth = require("../middlewares/auth");
const router = express.Router();

router.get("/messages/:groupId", auth, messageController.getMessages);
router.post(
  "/messages",
  auth,
  createMessageValidation,
  messageController.createMessage
);
router.patch(
  "/messages/like",
  auth,
  likeMessageValidation,
  messageController.likeMessage
);

module.exports = router;
