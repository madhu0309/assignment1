const express = require("express");
const groupController = require("../controllers/group.controller");
const { groupMemberValidation } = require("../validations/group.validation");
const auth = require("../middlewares/auth");

const router = express.Router();

router.get("/", auth, groupController.groupsList);
router.post("/", auth, groupController.createGroup);
router.delete("/:id", auth, groupController.deleteGroup);
router.patch(
  "/add-member/:id",
  auth,
  groupMemberValidation,
  groupController.addGroupMember
);
router.patch(
  "/remove-member/:id",
  auth,
  groupMemberValidation,
  groupController.removeGroupMember
);

module.exports = router;
