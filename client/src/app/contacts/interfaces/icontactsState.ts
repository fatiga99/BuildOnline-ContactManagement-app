import { Contact } from './icontact';

export interface ContactsState {
    contacts: Contact[];
    loading: boolean;
    error: string | null;
    totalPages: number; 
    currentPage: number; 
}