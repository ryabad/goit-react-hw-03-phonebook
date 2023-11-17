import { Component } from 'react';
import css from './index.module.css';

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.addContact(this.state);
    e.currentTarget.reset();
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className={css.form}>
        <div>
          <label htmlFor="inputName"></label>
          <input
            className={css.nameInput}
            name="name"
            type="text"
            id="inputName"
            onChange={this.handleChange}
            value={this.state.value}
            required
            pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            placeholder="Name"
          />
        </div>
        <div>
          <label htmlFor="inputPhone"></label>
          <input
            className={css.numberInput}
            name="number"
            type="tel"
            id="inputPhone"
            onChange={this.handleChange}
            value={this.state.value}
            required
            pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
            placeholder="Number"
          />
        </div>
        <button type="submit" className={css.addContactBtn}>
          Add contact
        </button>
      </form>
    );
  }
}
export default ContactForm;
