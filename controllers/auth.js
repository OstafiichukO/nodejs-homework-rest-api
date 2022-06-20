const authService = require("../services/user.service");
const imageService = require("../services/image.service")

const signupUser = async (req, res, next) => {
  try {
    const user = await authService.signupUser(req.body);
    res.status(201).json({
      password: user.password,
      email: user.email,
      subscription: user.subscription,
      id: user._id,
      avatarURL: user.avatarURL,
    });
  } catch (e) {
    next(e);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const token = await authService.loginUser(req.body);
    res.json(token);
  } catch (e) {
    next(e);
  }
};
const logoutUser = async (req, res, next) => {
  try {
    await authService.logoutUser(req.user._id);
    res.sendStatus(204);
  } catch (e) {
    next(e);
  }
};
const currentUser = async (req, res, next) => {
  const { email, subscription } = req.user;
  res.json({
    user: {
      email,
      subscription,
    },
  });
};
const avatarsUser = async (req, res, next) => {
  try {
    const { _id: id } = req.user;
    const avatarURL = await imageService.uploadImage(id, req.file);
    await authService.updateUser(id, { avatarURL });
    res.json({ avatarURL });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  signupUser,
  loginUser,
  logoutUser,
  currentUser,
  avatarsUser,
};
