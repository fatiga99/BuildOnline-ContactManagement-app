import { contact as Contact } from "@prisma/client";
import { PaginationParameters } from "./iPaginationParameters";

export interface IContactRepository {
    getContactsByUserIdWithPagination( parameters: PaginationParameters): Promise<{ data: Contact[]; total: number }>; 
    getContactsCount(parameters: { userId: number; searchTerm: string }): Promise<number>; 
    getContactById(contactId: number): Promise<Contact | null>; 
    createContact(contact: Omit<Contact, "id">): Promise<number>; 
    updateContact(contact: Contact): Promise<void>;
    deleteContact(contactId: number): Promise<void>; 
}
