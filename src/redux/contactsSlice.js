import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const contactsSlice = createSlice({
    name: 'contacts',
    initialState: {
        items: [],
        filter: '',
    },
    reducers: {
        addContact(state, action) { state.items = [...state.items, action.payload] },
        filterContacts(state, action) { state.filter = action.payload },
        deleteContacts(state, action) { state.items = [...state.items.filter(item => item.id !== action.payload)] }
    }
});

const persistConfig = {
  key: 'contacts',
    storage,
    whitelist: ['items'],
}

export const contactsReducer = persistReducer(persistConfig, contactsSlice.reducer);

export const { addContact, filterContacts, deleteContacts } = contactsSlice.actions;

// Selectors

export const getContactsItem = state => state.contacts.items;