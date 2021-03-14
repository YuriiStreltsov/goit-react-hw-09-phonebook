import { DebounceInput } from 'react-debounce-input';
import s from './Filter.module.scss';
import { contactsActions, contactsSelectors } from '../../redux/contacts';
import { useDispatch, useSelector } from 'react-redux';

export default function Filter() {
  const value = useSelector(contactsSelectors.getFilter);

  const dispatch = useDispatch();
  const onChange = e => dispatch(contactsActions.changeFilter(e.target.value));
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
}
