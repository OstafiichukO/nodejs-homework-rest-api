const { contacts } = require("../services");
const { createError } = require("../helpers/errors");

const listContacts = async (req, res, next) => {
  try {
    const data = await contacts.listContacts();
    res.json(data);
  } catch (e) {
    next(e);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await contacts.getContactById(id, req.body);
    if (!contact) {
      throw createError(404, "Not found");
    }
    res.status(200).json(contact);
  } catch (e) {
    next(e);
  }
};

const addContact = async (req, res, next) => {
  try {
    const contact = await contacts.addContact(req.body);
    res.status(201).json(contact);
  } catch (e) {
    if (e.message.includes("duplicate")) {
      e.status = 400;
    }
    next(e);
  }
};

const removeContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = contacts.removeContact(id);
    if (!contact) {
      throw createError(404, "Not found");
    }
    res.status(204).json();
  } catch (e) {
    next(e);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await contacts.updateContact(id, req.body);
    if (!contact) {
      throw createError(404, "Not found");
    }
    res.json(contact);
  } catch (e) {
    next(e);
  }
};

const updateFavorite = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await contacts.updateContact(id, req.body);
    if (!contact) {
      throw createError(404, "Not found");
    }
    res.json(contact);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateFavorite,
};
