import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Contact } from './interfaces/icontact';
import { ContactsState } from './interfaces/icontactsState';

const initialState: ContactsState = {
    contacts: [],
    loading: false,
    error: null,
};

const contactsSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {
        setContacts: (state, action: PayloadAction<Contact[]>) => {
            state.contacts = action.payload;
        },
        addContact: (state, action: PayloadAction<Contact>) => {
            state.contacts.push(action.payload);
        },
        updateContact: (state, action: PayloadAction<Contact>) => {
            const index = state.contacts.findIndex(contact => contact.id === action.payload.id);
            if (index !== -1) {
                state.contacts[index] = action.payload;
            }
        },
        deleteContact: (state, action: PayloadAction<number>) => {
            state.contacts = state.contacts.filter(contact => contact.id !== action.payload);
        },
    },
});

export const { setContacts, addContact, updateContact, deleteContact } = contactsSlice.actions;
export default contactsSlice.reducer;