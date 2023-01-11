import { nanoid } from 'nanoid';
import { Component } from "react";
import { ContactForm } from "./ContactForm/ContactForm";
import { ContactList } from "./ContactList/ContactList";
import { Filter } from "./Filter/Filter";
import css from "./ContactForm/ContactForm.module.css";

export class App extends Component {

  state = {
    contacts: [
      {id: nanoid(), name: 'Rosie Simpson', number: '459-12-56'},
      {id: nanoid(), name: 'Hermione Kline', number: '443-89-12'},
      {id: nanoid(), name: 'Eden Clements', number: '645-17-79'},
      {id: nanoid(), name: 'Annie Copeland', number: '227-91-26'},
    ],
    filter: '',
  };

  addContact = ({ name, number }) => {
    const { contacts } = this.state;

    const newContact = {
      name,
      number,
      id: nanoid(),
    };

    contacts.find(contact => contact.name.toLowerCase() === name.toLowerCase())
      ? alert(`${name} is already on contacts`)
      : this.setState(({ contacts }) => ({
          contacts: [newContact, ...contacts],
        }));

  }

  deleteContact = (contactId) => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId)
    }))
  }

  changeFilter = event => {
    this.setState({ filter: event.currentTarget.value });
  };

  getVisibleContacts = () => {  
    const { filter, contacts } = this.state;

    const normolizedFilter = filter.toLowerCase().trim();
    return (
      contacts.filter(contact =>
        contact.name.toLowerCase().includes(normolizedFilter)
      )
    )
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {

      localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
    }
  }

  render() {
    const visibleContacts = this.getVisibleContacts();
    const { filter, contacts } = this.state;
    const { addContact, changeFilter, deleteContact } = this;

    return (
        <div className={css.container}>

          <section className={css.sectionPhonebook}>
            <h2 className={css.sectionHeader}>Phonebook</h2>
            <ContactForm 
              onSubmit={addContact}
            />
          </section>

          <Filter 
            value={filter} 
            onChange={changeFilter}
          />

          <section className={css.sectionContacts}>
            <h2 className={css.sectionHeader}>Contacts</h2>
            <ContactList
              contacts={visibleContacts}
              onDelete={deleteContact}
            />
          </section>
          <p>Total number of contacts in the phonebook: {contacts.length}</p>
      </div>
    );
  }
};
