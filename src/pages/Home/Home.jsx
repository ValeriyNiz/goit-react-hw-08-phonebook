import { Title } from './Home.styled';
import '../../components/ContactForm/ContactForm.module.css';
import { NavLinkSt } from '../../components/SharedLayout/SharedLayout.styled';
import s from './Home.module.css';

export default function Home() {
  return (
    <section>
      <form>
        <Title>Phonebook application</Title>
      </form>
      <NavLinkSt to="/register">
        <p className={s.joinBtn}>
          <span>Click!</span>
          <span>Join the App</span>
        </p>
      </NavLinkSt>
    </section>
  );
}
