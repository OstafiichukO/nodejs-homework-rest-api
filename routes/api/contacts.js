/* eslint-disable no-unused-vars */
const express = require("express");
const router = express.Router();
const Joi = require("joi");

const { listContacts, getContactById } = require("../../models/contacts");

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

router.get("/", async (req, res, next) => {
  const data = await listContacts();
  res.status(200).json(data);
});
// =======================================
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

// const getContactById = async (contactId) => {
//   const contactsList = await readContacts();
//   const contact = contactsList.find((el) => el.id === contactId);
//   return contact;
// };
// ===========================================
router.get("/:id", validateId, getContactById);
// router.get("/:id", async (req, res, next) => {
//   const { id } = req.params;
//   const data = await getContactById(id);
//   if (!data) {
//     return res.status(404).json({ message: "Contact not found" });
//   }
//   res.status(200).json(data);
//   // const data = await getContactById(req.params.contactId);
//   // res.json(JSON.stringify(data));
// });

router.post("/", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.delete("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
