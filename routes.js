const express = require("express");
const router = express.Router();
const userController = require("./controllers/user.controller");
const groupController = require("./controllers/group.controller");
const messageController = require("./controllers/message.controller");
const auth = require("./middlewares/auth");
const isAdmin = require("./middlewares/isadmin");
const {
  createUserValidation,
  updateUserValidation,
  loginUserValidation
} = require("./validations/user.validation");
const {
  createMessageValidation,
  likeMessageValidation,
} = require("./validations/message.validation");
const { groupMemberValidation } = require("./validations/group.validation"); 

router.post(
  "/users",
  auth,
  isAdmin,
  createUserValidation,
  userController.createUser
);
router.put(
  "/users",
  auth,
  isAdmin,
  updateUserValidation,
  userController.updateUser
);
router.post("/users/login", loginUserValidation, userController.loginUser);
router.post("/users/logout", auth, userController.logoutUser);

router.get("/groups", auth, groupController.groupsList);
router.post("/groups", auth, groupController.createGroup);
router.delete("/groups/:id", auth, groupController.deleteGroup);
router.patch("/groups/add-member/:id", auth, groupMemberValidation, groupController.addGroupMember);
router.patch("/groups/remove-member/:id", auth, groupMemberValidation, groupController.removeGroupMember);

router.get(
  "/messages/:groupId",
  auth,
  messageController.getMessages
)
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
