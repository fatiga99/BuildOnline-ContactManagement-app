import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Contact } from './interfaces/icontact';
import { ContactsState } from './interfaces/icontactsState';
import { fetchContacts, createNewContact, editContact, removeContact } from './contactService';

const initialState: ContactsState = {
    contacts: [],
    loading: false,
    error: null,
    totalPages: 0,
    currentPage: 1,
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
    extraReducers: (builder) => {
        builder
            .addCase(fetchContacts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchContacts.fulfilled, (state, action) => {
                state.loading = false;
                state.contacts = action.payload.data;
                state.totalPages = action.payload.totalPages;
                state.currentPage = action.payload.currentPage;
            })
            .addCase(fetchContacts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(createNewContact.fulfilled, (state, action: PayloadAction<Contact>) => {
                state.contacts.push(action.payload);
            })
            .addCase(editContact.fulfilled, (state, action: PayloadAction<Contact>) => {
                const index = state.contacts.findIndex(contact => contact.id === action.payload.id);
                if (index !== -1) {
                    state.contacts[index] = action.payload;
                }
            })
            .addCase(removeContact.fulfilled, (state, action: PayloadAction<number>) => {
                state.contacts = state.contacts.filter(contact => contact.id !== action.payload);
            });
    },
});

export const { setContacts, addContact, updateContact, deleteContact } = contactsSlice.actions;
export default contactsSlice.reducer;
