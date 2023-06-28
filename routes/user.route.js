const express = require("express");
const userController = require("../controllers/user.controller");
const isAdmin = require("../middlewares/isadmin");
const auth = require("../middlewares/auth");
const {
  createUserValidation,
  updateUserValidation,
  loginUserValidation,
} = require("../validations/user.validation");

const router = express.Router();

router.post(
  "/",
  auth,
  isAdmin,
  createUserValidation,
  userController.createUser
);
router.put(
  "/",
  auth,
  isAdmin,
  updateUserValidation,
  userController.updateUser
);
router.post("/login", loginUserValidation, userController.loginUser);
router.post("/logout", auth, userController.logoutUser);

module.exports = router;
