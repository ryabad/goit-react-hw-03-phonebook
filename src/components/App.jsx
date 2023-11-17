import { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';
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
    this.setState(
      prevState => {
        return {
          contacts: [...prevState.contacts, newContactObj],
        };
      },
      () => {
        Notiflix.Notify.success(`${newContactObj.name} has been added!`);
      }
    );
  };

  handleDeleteBtn = id => {
    const deletedContact = this.state.contacts.find(el => el.id === id);
    Notiflix.Notify.info(`${deletedContact.name} was deleted!`);

    this.setState(prevState => ({
      contacts: prevState.contacts.filter(el => el.id !== id),
    }));
  };

  componentDidMount() {
    const localData = localStorage.getItem('contactsData');

    if (localData && localData.length > 0) {
      this.setState({ contacts: JSON.parse(localData) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts.length !== this.state.contacts.length) {
      localStorage.setItem('contactsData', JSON.stringify(this.state.contacts));
    }
    // prevState.contacts.length !== this.state.contacts.length &&
    //   localStorage.setItem('contactsData', JSON.stringify(this.state.contacts));
  }

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
