import React from 'react';
import s from './HomePage.module.scss';
import { CSSTransition } from 'react-transition-group';
import { routes } from '../../routes';
import { authSelectors } from '../../redux/auth';
import { Header } from '../../components';
import { useSelector } from 'react-redux';

export default function HomePage({ history }) {
  const isAuthenticated = useSelector(authSelectors.getIsAuthenticated);

  const handleGoView = e => {
    const { name } = e.target;
    history.push(routes[name]);
  };

  return (
    <>
      {isAuthenticated ? (
        <Header />
      ) : (
        <CSSTransition in={true} timeout={500} classNames={s} appear={true}>
          <h1 className={s.HomePage__title}>
            Welcome to <span className={s.HomePage__span}>Phonebook</span>
          </h1>
        </CSSTransition>
      )}

      <div className={s.HomePage__button__container}>
        <button
          name="register"
          type="button"
          className={s.HomePage__button__register}
          onClick={handleGoView}
        >
          Registration
        </button>
        <button
          name="login"
          type="button"
          className={s.HomePage__button__login}
          onClick={handleGoView}
        >
          LogIn
        </button>
      </div>
      <p className={s.HomePage__text}>
        If you are an unregistered user click the Registration button, if you
        are already registered click the LogIn button
      </p>
    </>
  );
}
