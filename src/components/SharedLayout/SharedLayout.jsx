import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

import UserMenu from 'components/UserMenu/UserMenu';

import { Container, Header, NavLinkSt } from './SharedLayout.styled';
import '../App.module.css';
import '../../components/ContactForm/ContactForm.module.css';

export const SharedLayout = () => {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  return (
    <>
      <Container>
        <Header>
          <nav>
            {isLoggedIn ? (
              <>
                <NavLinkSt to="/contacts">
                  <button>Contacts</button>
                </NavLinkSt>
              </>
            ) : (
              <>
                <NavLinkSt to="/">
                  <button>Home</button>
                </NavLinkSt>
                <NavLinkSt to="/register">
                  <button>Registration</button>
                </NavLinkSt>
                <NavLinkSt to="/login">
                  <button>Log in</button>{' '}
                </NavLinkSt>
              </>
            )}
          </nav>
          {isLoggedIn && <UserMenu />}
        </Header>
      </Container>
      <main className="background">
        <Container>
          <Outlet />
        </Container>
      </main>
    </>
  );
};
