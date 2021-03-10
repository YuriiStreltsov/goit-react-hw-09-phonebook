import { Component } from 'react';
import ContactsListItem from './ContactsListItem';
import { connect } from 'react-redux';
import operations from '../../redux/contacts/contacts-operations';
import Loader from 'react-loader-spinner';
import Modal from '../Modal/Modal';
import FormAddContact from '../FormAddContact/FormAddContact';
import selectors from '../../redux/contacts/contacts-selectors';

class ContactsList extends Component {
  state = {
    showModal: false,
  };

  componentDidMount() {
    this.props.fetchContacts();
  }

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { items, isLoading, onDeleteContact } = this.props;
    const { showModal } = this.state;
    return (
      <>
        <ul className="ContactsList">
          <Loader
            visible={isLoading}
            className="Loader"
            type="TailSpin"
            color="#00BFFF"
            width={150}
            height={150}
          />
          {isLoading && <p className="Loader-text">Loadind...</p>}
          <ContactsListItem items={items} onDeleteContact={onDeleteContact} />
        </ul>
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <FormAddContact onSave={this.toggleModal} />
          </Modal>
        )}
      </>
    );
  }
}

const mapStateToProps = state => ({
  items: selectors.getFilteredContacts(state),
  isLoading: selectors.getLoading(state),
});

const mapDispatchToProps = dispatch => ({
  onDeleteContact: id => dispatch(operations.deleteContact(id)),
  fetchContacts: () => dispatch(operations.fetchContacts()),
  onEditContact: contact => dispatch(operations.editContact(contact)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ContactsList);
