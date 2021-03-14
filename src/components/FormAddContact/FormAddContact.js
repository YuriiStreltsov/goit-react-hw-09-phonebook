import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import shortid from 'shortid';
import s from './FormAddContact.module.scss';
import showNotify from '../Notify/Notify';
import { contactsOperations, contactsSelectors } from '../../redux/contacts';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

export default function FormAddContact({ onCloseModal }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const items = useSelector(contactsSelectors.getAllContacts);
  const dispatch = useDispatch();

  const onSubmitAdd = contact =>
    dispatch(contactsOperations.addContact(contact));
  const onSubmitEdit = contact =>
    dispatch(contactsOperations.editContact(contact));

  const inputNameId = shortid.generate();
  const inputNumberId = shortid.generate();

  const handleChangeName = ({ target }) => {
    const { value } = target;
    setName(value);
  };

  const handleChangeNumber = ({ target }) => {
    const { value } = target;
    setNumber(value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (name.length === 0 || number.length === 0) {
      return showNotify('', 'Fields cannot be empty');
    }
    const unavailableName = items.find(item => item.name === name);
    if (unavailableName) {
      showNotify(name, 'is already in contacts');
      return;
    }

    const contact = {
      name: name,
      number: number,
    };

    onSubmitAdd(contact);
    onCloseModal();
    resetForm();
  };

  const resetForm = () => {
    setName('');
    setNumber('');
  };

  return (
    <>
      <form className={s.PhonebookForm} onSubmit={handleSubmit}>
        <p className={s.text}>
          To add a contact, fill in the fields below and click the "ADD CONTACT"
        </p>
        <label htmlFor={inputNameId} className={s.labelTitle}>
          Name:
        </label>
        <input
          id={inputNameId}
          type="text"
          value={name}
          onChange={handleChangeName}
          className={s.input}
          autoFocus
        />
        <label htmlFor={inputNumberId} className={s.labelTitle}>
          Number:
        </label>
        <input
          id={inputNumberId}
          type="number"
          value={number}
          onChange={handleChangeNumber}
          className={s.input}
        />
        <Button
          style={{ width: 200 }}
          type="submit"
          variant="contained"
          color="primary"
          endIcon={<AddIcon />}
        >
          Add contact
        </Button>
      </form>
    </>
  );
}
