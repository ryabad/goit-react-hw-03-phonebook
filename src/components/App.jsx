import { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm';
import Filter from './Filter';
import ContactList from './ContactList';
import Notiflix from 'notiflix';

import css from './App.module.css';

Notiflix.Notify.init({
  position: 'center-top',
  width: '300px',
});

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  handleFilterChange = e => {
    this.setState({ filter: e.target.value });
  };

  addContact = newContact => {
    const isExist = this.state.contacts.some(el => el.name === newContact.name);
    if (isExist) {
      Notiflix.Notify.failure(`${newContact.name} is already in contacts`);
      return;
    }

    const newContactObj = {
      ...newContact,
      id: nanoid(),
    };
    this.setState(prevState => {
      return {
        contacts: [...prevState.contacts, newContactObj],
      };
    });
  };

  handleDeleteBtn = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(el => el.id !== id),
    }));
  };

  render() {
    const { contacts, filter } = this.state;

    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
      <div className={css.container}>
        <h2 className={css.title}>Phonebook</h2>
        <ContactForm addContact={this.addContact} />

        <h2 className={css.contacts}>Contacts</h2>
        <Filter handleFilter={this.handleFilterChange} />
        <ContactList
          contacts={filteredContacts}
          handleDelete={this.handleDeleteBtn}
        />
      </div>
    );
  }
}

export default App;
