import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { logInUser } from 'redux/slices/authorizationSlice';

import s from '../../components/ContactForm/ContactForm.module.css';
import '../../components/App/App.module.css';

const LogIn = () => {
  const dispatch = useDispatch();
  const [formFields, setFormFields] = useState({
    email: '',
    password: '',
  });

  const handleChange = event => {
    const { name, value } = event.currentTarget;
    setFormFields(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(logInUser(formFields));
  };

  return (
    <section>
      <form className={s.logInForm} onSubmit={handleSubmit}>
        <label>
          {' '}
          <h3>Email</h3>
          <input
            className={s.inputLogIn}
            type="email"
            name="email"
            value={formFields.email}
            onChange={handleChange}
            title="Please enter valid email address, for example  'example@gmail.com'"
            min-length="6"
            required
          />
        </label>
        <label>
          {' '}
          <h3>Password</h3>
          <input
            className={s.inputLogIn}
            type="password"
            name="password"
            value={formFields.password}
            onChange={handleChange}
            title="Please enter your password. Minimum length 8 symbols"
            min-length="8"
            required
          />
        </label>
        <button className="button" type="submit">
          Log in
        </button>
      </form>
    </section>
  );
};

export default LogIn;
