import { listContacts, getContactById, removeContact, addContact } from "./contacts.js";
import { program } from "commander";

program.option("-a, --action <type>", "choose action").option("-i, --id <type>", "user id").option("-n, --name <type>", "user name").option("-e, --email <type>", "user email").option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

// TODO: рефакторити
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const listOfContacts = await listContacts();
      console.log(listOfContacts);
      break;

    case "get":
      if (!id) {
        console.log("Add id-argument to the command");
        break;
      }
      const contact = await getContactById(id);
      console.log(contact);
      break;

    case "add":
      if (!name || !email || !phone) {
        console.log("Check three arguments");
        break;
      }
      const newContact = await addContact(name, email, phone);
      console.log(newContact);
      break;

    case "remove":
      if (!id) {
        console.log("Add id-argument to the command");
        break;
      }
      const removedContact = await removeContact(id);
      console.log(removedContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
