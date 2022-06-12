const express = require("express");
const router = express.Router();

const { validateRequest } = require("../../middlewares/validateRequest");
const { schemaSignup, schemaLogin } = require("../../models/user");
const {
  signupUser,
  loginUser,
  logoutUser,
  currentUser,
} = require("../../controllers/auth");
const { auth } = require("../../middlewares/auth");

router.post("/signup", validateRequest(schemaSignup), signupUser);
router.post("/login", validateRequest(schemaLogin), loginUser);
router.post("/logout", auth, logoutUser);
router.post("/current", auth, currentUser);

module.exports = router;
