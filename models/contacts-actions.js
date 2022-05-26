/* eslint-disable no-empty */
const fs = require("fs").promises;
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.resolve("./models/contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const contactsList = JSON.parse(data);
    console.table(contactsList);
    return contactsList;
  } catch (error) {
    throw error.message;
  } finally {
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const contact = await contacts.find((el) => el.id === contactId);
    if (!contact) {
      throw new Error(`We didnt have contact with id ${contactId}!`);
    }
    console.table(contact);
    return contact;
  } finally {
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const newContacts = await contacts.filter((el) => el.id !== contactId);
    fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2));
    console.table(newContacts);
    return newContacts;
  } catch (error) {
    throw error.message;
  } finally {
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    const newContact = {
      id: v4(),
      name,
      email,
      phone,
    };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    console.table(contacts);
    return newContact;
  } catch (error) {
    throw error.message;
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
