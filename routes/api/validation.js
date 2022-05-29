/* eslint-disable no-unused-vars */
const Joi = require("joi");

const createSchema = Joi.object({
  name: Joi.string().min(2).max(25).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "ua", "goit"] },
    })
    .required(),
  phone: Joi.string().required(),
});

const updateSchema = Joi.object({
  name: Joi.string().min(2).max(25).optional(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "ua", "goit"] },
    })
    .optional(),
  phone: Joi.string().optional(),
}).or("name", "email", "phone");

const idSchema = Joi.object({ id: Joi.string().required() });

const validateCreate = async (req, res, next) => {
  try {
    const value = await createSchema.validateAsync(req.body);
  } catch (err) {
    return res
      .status(400)
      .json({ message: `Field ${err.message.replace(/"/g, "")}` });
  }
  next();
};

const validateUpdate = async (req, res, next) => {
  try {
    const value = await updateSchema.validateAsync(req.body);
  } catch (err) {
    const [{ type }] = err.details;
    if (type === "object.unknown") {
      return res.status(400).json({ message: err.message });
    }
    return res.status(400).json({ message: `missing fields` });
  }
  next();
};

const validateId = async (req, res, next) => {
  try {
    const value = await idSchema.validateAsync(req.params);
  } catch (err) {
    return res
      .status(400)
      .json({ message: `${err.message.replace(/"/g, "")}` });
  }
  next();
};

module.exports = {
  validateCreate,
  validateUpdate,
  validateId,
};
