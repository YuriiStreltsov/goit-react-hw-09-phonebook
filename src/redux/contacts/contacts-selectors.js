import { createSelector } from '@reduxjs/toolkit';

const getAllContacts = state => state.contacts.items;
const getLoading = state => state.contacts.loading;
const getFilter = state => state.contacts.filter;
const getEditContact = state => state.contacts.editContact;

const getFilteredContacts = createSelector(
  [getAllContacts, getFilter],
  (contacts, filter) => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter),
    );
  },
);

const selectors = {
  getAllContacts,
  getFilter,
  getLoading,
  getEditContact,
  getFilteredContacts,
};

export default selectors;
