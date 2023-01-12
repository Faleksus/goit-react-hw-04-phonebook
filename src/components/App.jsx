import { nanoid } from "nanoid";
import { useState, useEffect } from "react";
import { ContactForm } from "./ContactForm/ContactForm";
import { ContactList } from "./ContactList/ContactList";
import { Filter } from "./Filter/Filter";
import css from "./ContactForm/ContactForm.module.css";

export const App = () => {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem("contacts")) ?? []
  );
  const [filter, setFilter] = useState("");

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const addContact = ({ name, number }) => {
    const newContact = {
      name,
      number,
      id: nanoid(),
    };

    contacts.find(
      (contact) => contact.name.toLowerCase() === name.toLowerCase()
    )
      ? alert(`${name} is already on contacts`)
      : setContacts((prewContacts) => [newContact, ...prewContacts]);
  };

  const deleteContact = (contactId) => {
    setContacts(contacts.filter((contact) => contact.id !== contactId));
  };

  const changeFilter = (event) => {
    setFilter(event.currentTarget.value);
  };

  const getVisibleContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase().trim())
  );

  return (
    <div className={css.container}>
      <section className={css.sectionPhonebook}>
        <h2 className={css.sectionHeader}>Phonebook</h2>
        <ContactForm onSubmit={addContact} />
      </section>

      <Filter value={filter} onChange={changeFilter} />

      <section className={css.sectionContacts}>
        <h2 className={css.sectionHeader}>Contacts</h2>
        <ContactList contacts={getVisibleContacts} onDelete={deleteContact} />
      </section>
      <p>
        Total number of contacts in the phonebook: {getVisibleContacts.length}
      </p>
    </div>
  );
};
