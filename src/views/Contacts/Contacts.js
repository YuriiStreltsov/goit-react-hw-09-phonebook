import {
  Header,
  FormAddContact,
  Filter,
  ContactsList,
  Modal,
} from '../../components';
import { contactsSelectors } from '../../redux/contacts';
import { useSelector } from 'react-redux';
import { useCallback, useState } from 'react';
import s from './Contacts.module.scss';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

export default function Contacts() {
  const [showModal, setShowModal] = useState(false);
  const items = useSelector(contactsSelectors.getAllContacts);

  const toggleModal = useCallback(() => {
    setShowModal(prevShowModal => !prevShowModal);
  }, []);

  const totalItems = items.length;

  return (
    <>
      <Header />
      <p className={s.text}>To add a contact click the "ADD CONTACT"</p>
      <Button
        style={{ marginBottom: 15, width: 200 }}
        type="submit"
        variant="contained"
        color="primary"
        endIcon={<AddIcon />}
        onClick={toggleModal}
      >
        Add contact
      </Button>
      {totalItems > 1 && <Filter />}
      <ContactsList />

      {showModal && (
        <Modal onClose={toggleModal}>
          <FormAddContact onCloseModal={toggleModal} />
        </Modal>
      )}
    </>
  );
}
