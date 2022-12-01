import { lazy, Suspense } from 'react';
import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { SharedLayout } from './SharedLayout/SharedLayout';
import WithLoading from './RouteComponent';
import { getLastUser } from '../redux/authorization';
import './App.module.css';

const Register = lazy(() => import('../pages/Register/Register'));
const LogIn = lazy(() => import('../pages/LogIn/LogIn'));
const Contacts = lazy(() => import('../pages/Contacts/Contacts'));
const Home = lazy(() => import('../pages/Home/Home'));
const NotFound = lazy(() => import('../pages/NotFound/NotFound'));

const ContactsWithLoading = WithLoading(Contacts);
const RegisterWithLoading = WithLoading(Register);
const LoginWithLoading = WithLoading(LogIn);

export const App = () => {
  const dispatch = useDispatch();
  const isLoggedInFromStore = useSelector(state => state.auth.isLoggedIn);

  useEffect(() => {
    dispatch(getLastUser());
  }, [dispatch]);

  return (
    <Suspense>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route
            path="/register"
            element={
              <RegisterWithLoading
                isLoggedIn={!isLoggedInFromStore}
                navigateTo="/contacts"
              />
            }
          />
          <Route
            path="/login"
            element={
              <LoginWithLoading
                isLoggedIn={!isLoggedInFromStore}
                navigateTo="/contacts"
              />
            }
          />
          <Route
            path="/contacts"
            element={
              <ContactsWithLoading
                isLoggedIn={isLoggedInFromStore}
                navigateTo="/login"
              />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
};
