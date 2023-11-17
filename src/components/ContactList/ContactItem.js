import css from './ContactList.module.css';

const ContactItem = ({ contacts, handleDelete }) => {
  return (
    <li className={css.item}>
      <p>
        {contacts.name}: {contacts.number}
      </p>
      <button
        onClick={() => handleDelete(contacts.id)}
        className={css.deleteBtn}
      >
        Delete
      </button>
    </li>
  );
};

export default ContactItem;
