import React, { Component } from 'react';
import shortid from 'shortid';
import Button from '@material-ui/core/Button';
import InputIcon from '@material-ui/icons/Input';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import s from './Register.module.scss';
import { routes } from '../../routes';
import { connect } from 'react-redux';
import { authOperations } from '../../redux/auth';
import showNotify from '../../components/Notify/Notify';

class Register extends Component {
  state = {
    name: '',
    email: '',
    password: '',
  };

  inputNameId = shortid.generate();
  inputEmailId = shortid.generate();
  inputPasswordId = shortid.generate();

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  onSubmit = e => {
    e.preventDefault();
    const { name, email, password } = this.state;
    if (name.length === 0 || email.length === 0 || password.length === 0) {
      return showNotify('', 'Fields cannot be empty');
    }
    this.props.onRegister(this.state);
    this.setState({ name: '', email: '', password: '' });
  };

  handleClick = () => {
    this.props.history.push(routes.home);
  };

  render() {
    const { name, email, password } = this.state;
    const { inputNameId } = this.inputNameId;
    const { inputEmailId } = this.inputEmailId;
    const { inputPasswordId } = this.inputPasswordId;
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
        <h2 className={s.RegisterTitle}>
          To register, fill in all the fields below
        </h2>
        <form className={s.RegisterForm} onSubmit={this.onSubmit}>
          <label htmlFor={inputNameId} className={s.labelTitle}>
            Name:
          </label>
          <input
            id={inputNameId}
            type="text"
            name="name"
            value={name}
            onChange={this.handleChange}
            className={s.input}
          />
          <label htmlFor={inputEmailId} className={s.labelTitle}>
            Email:
          </label>
          <input
            id={inputEmailId}
            type="email"
            name="email"
            value={email}
            onChange={this.handleChange}
            className={s.input}
          />
          <label htmlFor={inputPasswordId} className={s.labelTitle}>
            Password:
          </label>
          <input
            id={inputPasswordId}
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
            className={s.input}
          />
          <Button
            style={{ marginRight: 'auto', width: 200 }}
            type="submit"
            variant="contained"
            color="primary"
            endIcon={<PersonAddIcon />}
          >
            Register now
          </Button>
        </form>
      </>
    );
  }
}

const mapDispatchToProps = {
  onRegister: authOperations.register,
};

export default connect(null, mapDispatchToProps)(Register);
