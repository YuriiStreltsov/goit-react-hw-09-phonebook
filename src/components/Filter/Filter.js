import { DebounceInput } from 'react-debounce-input';
import PropTypes from 'prop-types';
import s from './Filter.module.scss';
import { connect } from 'react-redux';
import { contactsActions } from '../../redux/contacts';
import selectors from '../../redux/contacts/contacts-selectors';

const Filter = ({ value, onChange }) => {
  return (
    <div className={s.filter}>
      <p className={s.text}>Find contacts by name</p>
      <DebounceInput
        minLength={1}
        debounceTimeout={300}
        value={value}
        onChange={onChange}
        className={s.input}
      />
    </div>
  );
};

Filter.propTypes = {
  onChange: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  value: selectors.getFilter(state),
});

const mapDispatchToProps = dispatch => ({
  onChange: e => dispatch(contactsActions.changeFilter(e.target.value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
