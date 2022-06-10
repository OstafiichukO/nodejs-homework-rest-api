const authService = require("../services/user.service");
//  or '../services'

const signupUser = async (req, res, next) => {
  try {
    const user = await authService.signupUser(req.body);
    res.status(201).json({
      password: user.password,
      email: user.email,
      subscription: user.subscription,
      id: user._id,
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
    await authService.logoutUser(req.user._id)
    res.sendStatus(204)
  } catch (e) {
    next(e);
  }
};

module.exports = { signupUser, loginUser, logoutUser };
