const express = require("express");
const router = express.Router();

const { validateRequest } = require("../../middlewares/validateRequest");
const { schemaSignup, schemaLogin } = require("../../models/user");
const { signupUser, loginUser, logoutUser } = require("../../controllers/auth");
const { auth } = require("../../middlewares/auth");

router.post("/signup", validateRequest(schemaSignup), signupUser);
router.post("/login", validateRequest(schemaLogin), loginUser);
router.post("/logout", auth, logoutUser);

module.exports = router;
