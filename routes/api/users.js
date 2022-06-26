const express = require("express");
const router = express.Router();

const { validateRequest } = require("../../middlewares/validateRequest");
const { schemaSignup, schemaLogin } = require("../../models/user");
const {
  signupUser,
  loginUser,
  logoutUser,
  currentUser,
  avatarsUser,
  confirm,
} = require("../../controllers/auth");
const { auth } = require("../../middlewares/auth");
const upload = require("../../middlewares/upload");

router.post("/signup", validateRequest(schemaSignup), signupUser);
router.post("/login", validateRequest(schemaLogin), loginUser);
router.post("/logout", auth, logoutUser);
router.post("/current", auth, currentUser);
router.patch("/avatars", auth, upload.single("avatar"), avatarsUser);
router.get("/verify/:verificationToken", confirm);

module.exports = router;
