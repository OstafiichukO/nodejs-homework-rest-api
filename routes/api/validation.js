/* eslint-disable no-unused-vars */
const Joi = require("joi");

const createSchema = Joi.object({
  name: Joi.string().min(5).max(15).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

const updateSchema = Joi.object({
  name: Joi.string().optional(),
  email: Joi.string().email().optional(),
  phone: Joi.string().optional(),
}).or("name", "email", "phone");

const idSchema = Joi.object({ id: Joi.string().required() });

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

module.exports = { validateId };
