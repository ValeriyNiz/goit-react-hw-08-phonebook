import { useSelector } from 'react-redux';

import ContactForm from 'components/ContactForm/ContactForm';
import Filter from 'components/Filter/Filter';
import ContactList from 'components/ContactList/ContactList';
import s from '../../components/App.module.css';
import '../../components/App.module.css';

const Contacts = () => {
  const tokenAuth = useSelector(state => state.auth);

  return (
    <section>
      <div className={s.userContactDiv}>
        <h1>{tokenAuth.user.name}</h1>
        <h2>Phonebook</h2>
        <ContactForm />
        <h2>Contacts</h2>
        <Filter />
        <ContactList />
      </div>
    </section>
  );
};

export default Contacts;
