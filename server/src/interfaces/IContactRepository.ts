import { contact as Contact } from "@prisma/client";

export interface IContactRepository {
    getContactsByUserId(userId: number): Promise<Contact[]>; 
    getContactById(contactId: number): Promise<Contact | null>; 
    createContact(contact: Omit<Contact, "id">): Promise<number>; 
    updateContact(contact: Contact): Promise<void>;
    deleteContact(contactId: number): Promise<void>; 
}
