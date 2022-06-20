const express = require("express");
const router = express.Router();

const { validateRequest } = require("../../middlewares/validateRequest");
const { schemaSignup, schemaLogin } = require("../../models/user");
const {
  signup,
  login,
  logout,
  current,
  avatars,
} = require("../../controllers/auth");
const { auth } = require("../../middlewares/auth");
const upload = require("../../middlewares/upload");

router.post("/signup", validateRequest(schemaSignup), signup);
router.post("/login", validateRequest(schemaLogin), login);
router.post("/logout", auth, logout);
router.post("/current", auth, current);
router.patch("/avatars", auth, upload.single("avatar"), avatars);

module.exports = router;
