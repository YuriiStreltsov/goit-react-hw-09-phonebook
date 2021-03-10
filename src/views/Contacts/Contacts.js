import { Component } from 'react';
import Filter from '../../components/Filter/Filter';
import ContactsList from '../../components/ContactsList/ContactsList';
import { connect } from 'react-redux';
import selectors from '../../redux/contacts/contacts-selectors';
import Header from '../../components/Header/Header';
import FormAddContact from '../../components/FormAddContact/FormAddContact';

class Contacts extends Component {
  render() {
    const totalItems = this.props.items.length;

    return (
      <>
        <Header />
        <FormAddContact />
        {totalItems > 1 && <Filter />}
        <ContactsList />
      </>
    );
  }
}
const mapStateToProps = state => ({
  items: selectors.getAllContacts(state),
});

export default connect(mapStateToProps)(Contacts);
