import { Contact } from "../models/contact";

export interface IContactRepository {
    getContactsByUserId(userId: number): Promise<Contact[]>; 
    getContactById(contactId: number): Promise<Contact | null>; 
    createContact(contact: Contact): Promise<number>;
    updateContact(contact: Contact): Promise<void>; 
    deleteContact(contactId: number): Promise<void>; 
}