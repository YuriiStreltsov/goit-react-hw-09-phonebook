import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import shortid from 'shortid';
import s from './FormAddContact.module.scss';
import showNotify from '../Notify/Notify';
import { contactsOperations, contactsSelectors } from '../../redux/contacts';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';

export default function FormEditContact({ onCloseModal }) {
  const editContact = useSelector(contactsSelectors.getEditContact);
  const [name, setName] = useState(editContact.name);
  const [number, setNumber] = useState(editContact.number);

  const items = useSelector(contactsSelectors.getAllContacts);
  const dispatch = useDispatch();

  const onSubmitEdit = contact =>
    dispatch(contactsOperations.editContact(contact));

  const fetchContacts = () => dispatch(contactsOperations.fetchContacts());

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

  const handleSubmit = async e => {
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
      id: editContact.id,
      name: name,
      number: number,
    };
    console.log(contact);
    await onSubmitEdit(contact);

    await fetchContacts();
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
          To add a contact, fill in the fields below and click the "ADIT
          CONTACT"
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
          endIcon={<EditIcon />}
        >
          Edit contact
        </Button>
      </form>
    </>
  );
}
