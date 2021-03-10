import React, { Component } from 'react';
import shortid from 'shortid';
import Button from '@material-ui/core/Button';
import InputIcon from '@material-ui/icons/Input';
import s from './Login.module.scss';
import { connect } from 'react-redux';
import { authOperations, authSelectors } from '../../redux/auth';
import { routes } from '../../routes';
import showNotify from '../../components/Notify/Notify';

class LogIn extends Component {
  state = {
    email: '',
    password: '',
  };

  inputEmailId = shortid.generate();
  inputPasswordId = shortid.generate();

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  onSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state;
    if (email.length === 0 || password.length === 0) {
      return showNotify('', 'Fields cannot be empty');
    }
    this.props.onLogin(this.state);
    this.setState({ email: '', password: '' });
  };

  handleClick = () => {
    this.props.history.push(routes.home);
  };

  render() {
    const { inputEmailId } = this.inputEmailId;
    const { inputPasswordId } = this.inputPasswordId;
    const { email, password } = this.state;
    return (
      <>
        <Button
          style={{ marginBottom: '10px', width: 150 }}
          type="submit"
          variant="contained"
          color="#777777"
          endIcon={<InputIcon />}
          onClick={this.handleClick}
        >
          Back Home
        </Button>
        <h2 className={s.LoginTitle}>To Login, fill in all the fields below</h2>
        <form className={s.LoginForm} onSubmit={this.onSubmit}>
          <label htmlFor={inputEmailId} className={s.labelTitle}>
            Email:
          </label>
          <input
            id={inputEmailId}
            type="email"
            name="email"
            onChange={this.handleChange}
            className={s.input}
            value={email}
          />
          <label htmlFor={inputPasswordId} className={s.labelTitle}>
            Password:
          </label>
          <input
            id={inputPasswordId}
            type="password"
            name="password"
            onChange={this.handleChange}
            className={s.input}
            value={password}
          />
          <Button
            style={{ marginRight: 'auto', width: 200 }}
            type="submit"
            variant="contained"
            color="primary"
            endIcon={<InputIcon />}
          >
            Log in
          </Button>
        </form>
      </>
    );
  }
}
const mapStateToProp = state => ({
  isAuthenticated: authSelectors.getIsAuthenticated(state),
});

const mapDispatchToProps = {
  onLogin: authOperations.login,
};

export default connect(mapStateToProp, mapDispatchToProps)(LogIn);
