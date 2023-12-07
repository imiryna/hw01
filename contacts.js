import fs from "fs/promises";
import { resolve } from "path";
import { nanoid } from "nanoid";

const contactsPath = resolve("db", "contacts.json");

export const listContacts = async () => {
  const allContacts = await fs.readFile(contactsPath);
  return JSON.parse(allContacts);
};

export const getContactById = async (id) => {
  const contactsArr = await listContacts();
  const contact = contactsArr.find((item) => item.id === id);
  return contact || null;
};

export async function removeContact(contactId) {
  const contactsArr = await listContacts();
  const removedContact = contactsArr.find((item) => item.id === contactId);
  if (removedContact) {
    const newContactArr = contactsArr.filter((item) => item.id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(newContactArr, null, 2));
    return removedContact;
  }
  return null;
}

export async function addContact(name, email, phone) {
  const contactsArr = await listContacts();
  const newContact = {
    name,
    email,
    phone,
    id: nanoid(),
  };
  contactsArr.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contactsArr, null, 2));
  return newContact;
}
// const test = async () => {
//   await addContact("Joye", "dfgs@gmail.com", "345-765-98");
// };

// test();
