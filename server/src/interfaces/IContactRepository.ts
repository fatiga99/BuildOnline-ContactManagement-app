import { Contact } from "../models/contact";
import { CreateContactDTO } from "./DTOs/createContactDTO";

export interface IContactRepository {
    getContactsByUserId(userId: number): Promise<Contact[]>;
    getContactById(contactId: number): Promise<Contact>;
    createContact(contact: CreateContactDTO): Promise<Contact>;
    updateContact(contact: Contact): Promise<Contact>;
    deleteContact(contactId: number): Promise<void>;
}