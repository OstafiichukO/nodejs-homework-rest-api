const express = require("express");
const router = express.Router();

const {
  listContacts,
  getContactById,
} = require("../../models/contacts-actions");

router.get("/", async (req, res, next) => {
  const data = await listContacts();
  res.json(JSON.stringify(data));
});

router.get("/:contactId", async (req, res, next) => {
  const data = await getContactById(req.params.contactId);
  res.json(JSON.stringify(data));
});

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
