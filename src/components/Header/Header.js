import React from 'react';
import { CSSTransition } from 'react-transition-group';
import s from './Header.module.scss';

import { connect } from 'react-redux';
import { authSelectors, authOperations } from '../../redux/auth';

function Header({ isAuthenticated, userName, onLogout }) {
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

const mapStateToProps = state => ({
  isAuthenticated: authSelectors.getIsAuthenticated(state),
  userName: authSelectors.getUsername(state),
});

const mapDispatchToProps = {
  onLogout: authOperations.logOut,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
