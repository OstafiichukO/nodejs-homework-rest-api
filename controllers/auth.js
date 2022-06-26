const authService = require("../services/user.service");
const emailService = require("../services/email.service");
const imageService = require("../services/image.service");
const { createError } = require("../helpers/errors");

const signupUser = async (req, res, next) => {
  try {
    const user = await authService.signupUser(req.body);
    await emailService.sendEmail(user.email, user.verificationToken);
    res.status(201).json({
      code: 200,
      data: {
        password: user.password,
        email: user.email,
        subscription: user.subscription,
        id: user._id,
        avatarURL: user.avatarURL,
      },
    });
  } catch (e) {
    next(e);
  }
};

const confirm = async (req, res, next) => {
  try {
    const { verificationToken } = req.params;
    const user = await authService.signupUser({ verificationToken });
    if (!user) {
      throw createError(404, "User not found");
    }
    await authService.updateUser(user._id, {
      verify: true,
      verificationToken: null,
    });
    return res.status(200).json({
      code: 200,
      message: "Eamil confirmed!",
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
  confirm,
  loginUser,
  logoutUser,
  currentUser,
  avatarsUser,
};
