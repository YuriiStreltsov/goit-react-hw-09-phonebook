import { createReducer, combineReducers } from '@reduxjs/toolkit';
import contactsActions from './contacts-actions';

const items = createReducer([], {
  [contactsActions.fetchContactsSuccess]: (_, { payload }) => payload,
  [contactsActions.addContactSuccess]: (state, { payload }) => [
    payload,
    ...state,
  ],
  [contactsActions.deleteContactSuccess]: (state, { payload }) =>
    state.filter(({ id }) => id !== payload),
  [contactsActions.editContactSuccess]: (state, { payload }) => [
    payload,
    ...state,
  ],
});
const loading = createReducer(false, {
  [contactsActions.addContactRequest]: () => true,
  [contactsActions.addContactSuccess]: () => false,
  [contactsActions.addContactError]: () => false,

  [contactsActions.deleteContactRequest]: () => true,
  [contactsActions.deleteContactSuccess]: () => false,
  [contactsActions.deleteContactError]: () => false,

  [contactsActions.fetchContactsRequest]: () => true,
  [contactsActions.fetchContactsSuccess]: () => false,
  [contactsActions.fetchContactsError]: () => false,

  [contactsActions.editContactsRequest]: () => true,
  [contactsActions.editContactsSuccess]: () => false,
  [contactsActions.editContactsError]: () => false,
});

const filter = createReducer('', {
  [contactsActions.changeFilter]: (_, { payload }) => payload,
});

const editContact = createReducer(null, {
  [contactsActions.onClickEditBtn]: (_, { payload }) => payload,
});

export default combineReducers({
  items,
  filter,
  loading,
  editContact,
});
