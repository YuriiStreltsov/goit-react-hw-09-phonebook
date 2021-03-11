import ContactsListItem from './ContactsListItem';
import operations from '../../redux/contacts/contacts-operations';
import Loader from 'react-loader-spinner';
// import Modal from '../Modal/Modal';
import { FormAddContact } from '../../components';
import selectors from '../../redux/contacts/contacts-selectors';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

export default function ContactsList() {
  const items = useSelector(selectors.getFilteredContacts);
  const isLoading = useSelector(selectors.getLoading);

  const dispatch = useDispatch();
  const onDeleteContact = id => dispatch(operations.deleteContact(id));

  const fetchContacts = () => dispatch(operations.fetchContacts());

  useEffect(() => {
    console.log('render');
    return fetchContacts();
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
        <ContactsListItem items={items} onDeleteContact={onDeleteContact} />
      </ul>
    </>
  );
}

// const mapDispatchToProps = dispatch => ({
//   onDeleteContact: id => dispatch(operations.deleteContact(id)),
//   fetchContacts: () => dispatch(operations.fetchContacts()),
//   onEditContact: contact => dispatch(operations.editContact(contact)),
// });
// export default connect(mapStateToProps, mapDispatchToProps)(ContactsList);
