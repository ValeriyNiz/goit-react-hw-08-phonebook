import { useState } from 'react';

import {
  useAddContactMutation,
  useGetContactsQuery,
} from 'services/contactsAPI';

import '../App.module.css';
import './ContactForm.module.css';

const ContactForm = () => {
  const { data } = useGetContactsQuery();
  const [formFields, setFormFields] = useState({
    name: '',
    number: '',
  });

  const [addContact] = useAddContactMutation();

  const handleChange = event => {
    const { name, value } = event.currentTarget;
    setFormFields(prevState => ({ ...prevState, [name]: value }));
  };

  const reset = () => {
    setFormFields({
      name: '',
      number: '',
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (data.some(contact => contact.number === formFields.number)) {
      alert(`This phone ${formFields.number} is already in contacts`);
      return;
    }
    addContact(formFields);

    reset();
  };

  return (
    <form className="contacts-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formFields.name}
        onChange={handleChange}
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
      />
      <input
        type="tel"
        name="number"
        placeholder="Phone"
        value={formFields.number}
        onChange={handleChange}
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
      />

      <button className="button" type="submit">
        Add contact
      </button>
    </form>
  );
};

export default ContactForm;
