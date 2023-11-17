import ContactItem from './ContactItem';

const ContactList = ({ contacts, handleDelete }) => {
  return (
    <ul>
      {contacts.map(el => (
        <ContactItem key={el.id} contacts={el} handleDelete={handleDelete} />
      ))}
    </ul>
  );
};

export default ContactList;
