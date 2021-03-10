import React, { Component } from 'react';
import s from './HomePage.module.scss';
import { CSSTransition } from 'react-transition-group';
import { routes } from '../../routes';
import { connect } from 'react-redux';
import { authSelectors } from '../../redux/auth';
import Header from '../../components/Header/Header';

class HomePage extends Component {
  handleGoView = e => {
    const { name } = e.target;
    this.props.history.push(routes[name]);
  };
  render() {
    return (
      <>
        {this.props.isAuthenticated ? (
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
            onClick={this.handleGoView}
          >
            Registration
          </button>
          <button
            name="login"
            type="button"
            className={s.HomePage__button__login}
            onClick={this.handleGoView}
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
}

const mapStateToProps = state => ({
  isAuthenticated: authSelectors.getIsAuthenticated(state),
});

export default connect(mapStateToProps)(HomePage);
