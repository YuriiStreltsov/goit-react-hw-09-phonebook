import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import shortid from 'shortid';
import Button from '@material-ui/core/Button';
import InputIcon from '@material-ui/icons/Input';
import s from './Login.module.scss';
import { authOperations } from '../../redux/auth';
import { routes } from '../../routes';
import { showNotify } from '../../components';

export default function LogIn({ history }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const inputEmailId = shortid.generate();
  const inputPasswordId = shortid.generate();

  const handleChange = ({ target: { name, value } }) => {
    switch (name) {
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
    if (email.length === 0 || password.length === 0) {
      return showNotify('', 'Fields cannot be empty');
    }

    dispatch(authOperations.login({ email, password }));
    setEmail('');
    setPassword('');
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
      <h2 className={s.LoginTitle}>To Login, fill in all the fields below</h2>
      <form className={s.LoginForm} onSubmit={onSubmit}>
        <label htmlFor={inputEmailId} className={s.labelTitle}>
          Email:
        </label>
        <input
          id={inputEmailId}
          type="email"
          name="email"
          onChange={handleChange}
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
          onChange={handleChange}
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
