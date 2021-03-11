import React from 'react';
import { CSSTransition } from 'react-transition-group';
import s from './Header.module.scss';
import { authSelectors, authOperations } from '../../redux/auth';
import { useSelector, useDispatch } from 'react-redux';

export default function Header() {
  const isAuthenticated = useSelector(authSelectors.getIsAuthenticated);
  const userName = useSelector(authSelectors.getUsername);
  const dispatch = useDispatch();
  const onLogout = () => dispatch(authOperations.logOut());
  return (
    <header className={s.Header}>
      <div className={s.wrapper}>
        <CSSTransition in={true} timeout={500} classNames={s} appear={true}>
          <a href="/">
            <h1 className={s.titleApp}>Phonebook</h1>
          </a>
        </CSSTransition>
        <p className={s.greeting}>
          Welcome
          <span className={s.userName}>
            {isAuthenticated ? userName : 'USER'}
          </span>
        </p>
        <button type="button" className={s.button} onClick={onLogout}>
          LogOut
        </button>
      </div>
    </header>
  );
}
