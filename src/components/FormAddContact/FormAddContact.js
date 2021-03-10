import { Component } from 'react';
import { connect } from 'react-redux';
import shortid from 'shortid';
import PropTypes from 'prop-types';
import s from './FormAddContact.module.scss';
import showNotify from '../Notify/Notify';
import contactsOperations from '../../redux/contacts/contacts-operations';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import selectors from '../../redux/contacts/contacts-selectors';

const INITIAL_STATE = {
  name: '',
  number: '',
};

class FormAddContact extends Component {
  state = { name: '', number: '' };

  inputNameId = shortid.generate();
  inputNumberId = shortid.generate();

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { name, number } = this.state;
    this.props.onSave();
    if (name.length === 0 || number.length === 0) {
      return showNotify('', 'Fields cannot be empty');
    }
    const contacts = this.props.items;

    const unavailableName = contacts.find(contact => contact.name === name);

    if (unavailableName) {
      showNotify(name, 'is already in contacts');

      return;
    }

    const contact = {
      name: name,
      number: number,
    };
    this.props.onSubmit(contact);
    this.resetForm();
  };

  resetForm = () => {
    this.setState({ ...INITIAL_STATE });
  };

  render() {
    const { name, number } = this.state;
    const { inputNameId } = this.inputNameId;
    const { inputNumberId } = this.inputNumberId;

    return (
      <>
        <p className={s.text}>
          To add a contact, fill in the fields below and click the "ADD CONTACT"
        </p>
        <form className={s.PhonebookForm} onSubmit={this.handleSubmit}>
          <label htmlFor={inputNameId} className={s.labelTitle}>
            Name:
          </label>
          <input
            id={inputNameId}
            type="text"
            name="name"
            value={name}
            onChange={this.handleChange}
            className={s.input}
          />
          <label htmlFor={inputNumberId} className={s.labelTitle}>
            Number:
          </label>
          <input
            id={inputNumberId}
            type="number"
            name="number"
            value={number}
            onChange={this.handleChange}
            className={s.input}
          />
          <Button
            style={{ marginRight: 'auto', width: 200 }}
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
}

FormAddContact.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  items: selectors.getAllContacts(state),
});

const mapDispatchToProps = dispatch => {
  return {
    onSubmit: contact => dispatch(contactsOperations.addContact(contact)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormAddContact);
