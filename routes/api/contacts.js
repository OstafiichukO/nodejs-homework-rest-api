const express = require("express");
const router = express.Router();

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts");
const { validateId, validateCreate, validateUpdate } = require("./validation");

router.get("/", async (req, res, next) => {
  try {
    const data = await listContacts();
    res.status(200).json(data);
  } catch (e) {
    next(e);
  }
});

router.get("/:id", validateId, async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await getContactById(id);
    if (!data) {
      return res.status(404).json({ message: "Not found" });
    }
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});

router.post("/", validateCreate, async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    const newContact = await addContact({ name, email, phone });
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", validateId, async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await removeContact(id);
    if (!contact) {
      return res.status(404).json({ message: "Not found" });
    }
    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
});

router.put("/:id", validateId, validateUpdate, async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await updateContact(id, req.body);
    if (!contact) {
      return res.status(404).json({ message: "Not found" });
    }
    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
