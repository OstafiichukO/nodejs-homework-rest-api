const express = require("express");
const router = express.Router();

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateFavorite,
} = require("../../controllers/contacts");
const {
  schemaCreate,
  schemaFavorite,
  schemaUpdate,
} = require("../../models/contact");
const { validateRequest } = require("../../middlewares/validateRequest");

router.get("/", listContacts);
router.get("/:id", getContactById);
router.post("/", validateRequest(schemaCreate), addContact);
router.delete("/:id", removeContact);
router.put("/:id", validateRequest(schemaUpdate), updateContact);
router.patch("/:id/favorite", validateRequest(schemaFavorite), updateFavorite);

module.exports = router;
