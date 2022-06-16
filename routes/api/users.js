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
const { upload } = require("../../middlewares/upload");
const { uploadImage } = require("../../services/image.service");
const { updateUser } = require("../../services/user.service");

router.post("/signup", validateRequest(schemaSignup), signupUser);
router.post("/login", validateRequest(schemaLogin), loginUser);
router.post("/logout", auth, logoutUser);
router.post("/current", auth, currentUser);
router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  async (req, res, next) => {
    try {
      const { _id: id } = req.user;
      const avatarURL = await uploadImage(id, req.file);
      await updateUser(id, { avatarURL });
      res.json({ avatarURL });
    } catch (e) {
      next(e);
    }
  }
);

module.exports = router;
