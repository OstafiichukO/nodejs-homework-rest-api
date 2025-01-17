const { User } = require("../models/user");
const { createError } = require("../helpers/errors");
const { SECRET_KEY } = require("../helpers/env");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signupUser = async (userData) => {
  const result = await User.findOne({ email: userData.email });
  if (result) {
    throw createError(409, "Email in use");
  }
  const password = userData.password;
  const hashedPassword = await bcrypt.hash(password, 10);

  return User.create({ ...userData, password: hashedPassword });
};

const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw createError(401, "Email or password is wrong");
  }
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    throw createError(401, "Email or password is wrong");
  }
  const payload = {
    id: user._id,
    subscription: user.subscription,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
  await User.findByIdAndUpdate(user._id, { token });
  return {
    token,
  };
};

const logoutUser = async (id) => {
  await User.findByIdAndUpdate(id, { token: null });
};

const authenticateUser = async (token) => {
  try {
    const payload = jwt.verify(token, SECRET_KEY);
    const { id } = payload;
    const user = await User.findById(id);
    return user.token !== token ? null : user;
  } catch (e) {
    return null;
  }
};

const updateUser = async (id, data) => {
  return User.findByIdAndUpdate(id, data, { new: true });
};

const findUser = async (filters) => {
  return User.findOne(filters);
};

module.exports = {
  signupUser,
  loginUser,
  logoutUser,
  authenticateUser,
  updateUser,
  findUser,
};
