import React, { useState } from 'react';
import shortid from 'shortid';
import Button from '@material-ui/core/Button';
import InputIcon from '@material-ui/icons/Input';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import s from './Register.module.scss';
import { routes } from '../../routes';
import { authOperations } from '../../redux/auth';
import { showNotify } from '../../components';
import { useDispatch } from 'react-redux';

export default function Register({ history }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const inputNameId = shortid.generate();
  const inputEmailId = shortid.generate();
  const inputPasswordId = shortid.generate();

  const dispatch = useDispatch();

  const handleChange = ({ target: { name, value } }) => {
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      default:
        return;
    }
  };

  const onSubmit = e => {
    e.preventDefault();

    if (name.length === 0 || email.length === 0 || password.length === 0) {
      return showNotify('', 'Fields cannot be empty');
    }
    dispatch(authOperations.register({ name, email, password }));
    this.setState({ name: '', email: '', password: '' });
  };

  const handleClick = () => {
    history.push(routes.home);
  };

  return (
    <>
      <Button
        style={{ marginBottom: '10px', width: 150 }}
        type="submit"
        variant="contained"
        color="#777777"
        endIcon={<InputIcon />}
        onClick={handleClick}
      >
        Back Home
      </Button>
      <h2 className={s.RegisterTitle}>
        To register, fill in all the fields below
      </h2>
      <form className={s.RegisterForm} onSubmit={onSubmit}>
        <label htmlFor={inputNameId} className={s.labelTitle}>
          Name:
        </label>
        <input
          id={inputNameId}
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
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
          onChange={handleChange}
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
          onChange={handleChange}
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
