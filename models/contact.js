/* eslint-disable no-unused-vars */
const { Schema, model } = require("mongoose");
const Joi = require("joi");

const schema = new Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "contact",
  },
});

const schemaCreate = Joi.object({
  name: Joi.string().min(2).max(25).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "ua", "goit"] },
    })
    .required(),
  phone: Joi.string().required(),
  favorite: Joi.bool().optional(),
});

const schemaUpdate = Joi.object({
  name: Joi.string().min(2).max(25).optional(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "ua", "goit"] },
    })
    .optional(),
  phone: Joi.string().optional(),
}).or("name", "email", "phone");

const schemaFavorite = Joi.object({
  favorite: Joi.bool().required(),
});

const Contact = model("contact", schema);

module.exports = {
  Contact,
  schemaCreate,
  schemaFavorite,
  schemaUpdate,
};
