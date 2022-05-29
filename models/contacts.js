const fs = require("fs/promises");
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.resolve("./models/contacts.json");

const readContacts = async () => {
  try {
    const contacts = await fs.readFile(contactsPath, "utf8");
    const data = JSON.parse(contacts);
    return data;
  } catch (error) {
    console.error(error.message);
  }
};

const listContacts = async () => {
  const contactsList = await readContacts();
  return contactsList;
};

const getContactById = async (contactId) => {
  const contactsList = await readContacts();
  const contact = contactsList.find((el) => el.id === contactId);
  return contact || null;
};

const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts();
  const newContact = {
    id: v4(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

const removeContact = async (contactId) => {
  const contacts = await readContacts();
  const index = contacts.findIndex((el) => el.id === contactId);
  const deletedContact = contacts[index];
  if (index !== -1) {
    contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  }
  return deletedContact || null;
};

const updateContact = async (contactId, body) => {
  const contacts = await readContacts();
  const contact = await contacts.filter((el) => el.id !== contactId);
  const updatedContact = { id: contactId, ...contacts[contact], ...body };
  contacts[contact] = updatedContact;
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return updatedContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
