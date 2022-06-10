const express = require("express");
const router = express.Router();

const { validateRequest } = require("../../middlewares/validateRequest");
const { schemaSignup, schemaLogin } = require("../../models/user");
const { signupUser, loginUser, logoutUser } = require("../../controllers/auth");
const { auth } = require("../../middlewares/auth");

router.post("/users/signup", validateRequest(schemaSignup), signupUser);
router.post("/users/login", validateRequest(schemaLogin), loginUser);
router.post("/users/logout", auth, logoutUser);

module.exports = router;
