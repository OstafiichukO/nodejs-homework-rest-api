/* eslint-disable no-unused-vars */
const { Schema, model } = require("mongoose");
const Joi = require("joi");

const schema = new Schema({
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter",
  },
  token: {
    type: String,
    default: null,
  },
});

const schemaRegister = Joi.object({
  password: Joi.string().min(2).max(25).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "ua", "goit"] },
    })
    .required(),
  subscription: Joi.string().required(),
  token: Joi.string().required(),
});

const schemaLogin = Joi.object({
  password: Joi.string().min(2).max(25).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "ua", "goit"] },
    })
    .required(),
});

const User = model("user", schema);

module.exports = {
  User,
  schemaRegister,
  schemaLogin,
};
