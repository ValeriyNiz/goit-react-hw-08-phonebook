import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { register } from 'redux/authorization';

import '../../components/App.module.css';
import s from '../../components/ContactForm/ContactForm.module.css';
import '../../components/ContactForm/ContactForm.module.css';

const Register = () => {
  const dispatch = useDispatch();
  const [formFields, setFormFields] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = event => {
    const { name, value } = event.currentTarget;
    setFormFields(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(register(formFields));
  };

  return (
    <section>
      <form className={s.registerForm} onSubmit={handleSubmit}>
        <h3>Name</h3>
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
        <h3>Email address</h3>
        <input
          type="email"
          name="email"
          placeholder="Email address"
          value={formFields.email}
          onChange={handleChange}
          title="Please enter valid email address, for example  'example@gmail.com'"
          min-length="6"
          required
        />
        <h3>Password</h3>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formFields.password}
          onChange={handleChange}
          title="Please enter your password. Minimum length 8 symbols"
          min-length="8"
          required
        />
        <button className="button" type="submit">
          Register
        </button>
      </form>
    </section>
  );
};

export default Register;
