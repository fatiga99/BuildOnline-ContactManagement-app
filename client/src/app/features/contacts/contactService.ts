import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '@/app/store';
import axiosInstance from '@/utils/axiosConfig';
import { Contact } from './interfaces/icontact';

export const fetchContacts = createAsyncThunk(
    'contacts/fetchContacts',
    async (_, thunkAPI) => {
        const state = thunkAPI.getState() as RootState;
        const token = state.auth.token;

        if (!token) {
            return thunkAPI.rejectWithValue('No token available');
        }

        try {
            const response = await axiosInstance.get('/api/contacts', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data || 'An error occurred');
        }
    }
);

export const createNewContact = createAsyncThunk(
    'contacts/createContact',
    async (contactData: Omit<Contact, 'id'>, thunkAPI) => {
        const state = thunkAPI.getState() as RootState;
        const token = state.auth.token;

        if (!token) {
            return thunkAPI.rejectWithValue('No token available');
        }

        try {
            const response = await axiosInstance.post('/api/contacts', contactData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data || 'An error occurred');
        }
    }
);

export const editContact = createAsyncThunk(
    'contacts/updateContact',
    async ({ contactId, contactData }: { contactId: number; contactData: Omit<Contact, 'id'> }, thunkAPI) => {
        const state = thunkAPI.getState() as RootState;
        const token = state.auth.token;

        if (!token) {
            return thunkAPI.rejectWithValue('No token available');
        }

        try {
            const response = await axiosInstance.put(`/api/contacts/${contactId}`, contactData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data || 'An error occurred');
        }
    }
);

export const removeContact = createAsyncThunk(
    'contacts/deleteContact',
    async (contactId: number, thunkAPI) => {
        const state = thunkAPI.getState() as RootState;
        const token = state.auth.token;

        if (!token) {
            return thunkAPI.rejectWithValue('No token available');
        }

        try {
            await axiosInstance.delete(`/api/contacts/${contactId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return contactId;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data || 'An error occurred');
        }
    }
);