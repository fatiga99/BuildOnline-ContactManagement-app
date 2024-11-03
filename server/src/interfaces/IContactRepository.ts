import { Contact } from "../models/Contact";

export interface IContactRepository {
    getContactsByUserId(userId: number): Promise<Contact[]>;
    createContact(contact: Contact): Promise<Contact>;
    updateContact(contactId: number, contact: Contact): Promise<void>;
    deleteContact(contactId: number): Promise<void>;
}