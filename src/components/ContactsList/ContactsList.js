import ContactsListItem from './ContactsListItem';
import Loader from 'react-loader-spinner';
import { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  contactsActions,
  contactsOperations,
  contactsSelectors,
} from '../../redux/contacts';

import { Modal, FormEditContact } from '../../components';

export default function ContactsList() {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = useCallback(() => {
    setShowModal(prevShowModal => !prevShowModal);
  }, []);

  const items = useSelector(contactsSelectors.getFilteredContacts);
  const isLoading = useSelector(contactsSelectors.getLoading);

  const dispatch = useDispatch();
  const onDeleteContact = id => dispatch(contactsOperations.deleteContact(id));
  const fetchContacts = () => dispatch(contactsOperations.fetchContacts());
  const onClickEditBtn = id => {
    toggleModal();
    dispatch(contactsActions.onClickEditBtn(id));
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <>
      <Loader
        visible={isLoading}
        className="Loader"
        type="TailSpin"
        color="#00BFFF"
        width={150}
        height={150}
      />
      {isLoading && <p className="Loader-text">Loadind...</p>}
      <ul className="ContactsList">
        <ContactsListItem
          items={items}
          onDeleteContact={onDeleteContact}
          onClickEditBtn={onClickEditBtn}
        />
      </ul>
      {showModal && (
        <Modal onClose={toggleModal}>
          <FormEditContact onCloseModal={toggleModal} />
        </Modal>
      )}
    </>
  );
}
