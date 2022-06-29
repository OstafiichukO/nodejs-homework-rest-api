/* eslint-disable no-unused-vars */
const { Schema, model } = require("mongoose");
const Joi = require("joi");
const gravatar = require("gravatar");
const { v4 } = require("uuid");

const schema = new Schema(
  {
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
    avatarURL: {
      type: String,
      default: function () {
        return gravatar.url(this.email, {}, true);
      },
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      default: function () {
        return v4();
      },
    },
  },
  { timestamps: true }
);

const schemaSignup = Joi.object({
  password: Joi.string().min(2).max(25).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "ua", "goit"] },
    })
    .required(),
  subscription: Joi.string(),
  // token: Joi.string().required(),
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
  schemaSignup,
  schemaLogin,
};
