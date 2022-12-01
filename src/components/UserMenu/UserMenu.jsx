import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { logoutUser } from 'redux/authorization';

import s from './UserMenu.module.css';
import '../App.module.css';

const getActive = ({ isActive }) => (isActive ? s.active : s.link);

const UserMenu = () => {
  const tokenAuth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const onClickHandle = () => {
    dispatch(logoutUser());
  };
  return (
    <nav>
      <div>
        <NavLink className={getActive} to="/" />
        {tokenAuth.isLoggedIn && (
          <NavLink className={getActive} to="/contacts" />
        )}
      </div>
      <div>
        {tokenAuth.isLoggedIn ? (
          <div className={s.userWelcome}>
            <p>
              <span className={s.username}>
                Welcome, {tokenAuth.user.name}!
              </span>
            </p>
          </div>
        ) : (
          <>
            <button className={getActive} to="/logInUser">
              Sign in
            </button>
            <button className={getActive} to="/register">
              Sign up
            </button>
          </>
        )}
      </div>
      <button className={s.logOutBtn} type="button" onClick={onClickHandle}>
        Log Out
      </button>
    </nav>
  );
};

export default UserMenu;
