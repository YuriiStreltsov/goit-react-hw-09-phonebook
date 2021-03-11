import { Header, FormAddContact, Filter, ContactsList } from '../../components';
import selectors from '../../redux/contacts/contacts-selectors';
import { useSelector } from 'react-redux';

export default function Contacts() {
  const items = useSelector(selectors.getAllContacts);

  const totalItems = items.length;

  return (
    <>
      <Header />
      <FormAddContact />
      {totalItems > 1 && <Filter />}
      <ContactsList />
    </>
  );
}
