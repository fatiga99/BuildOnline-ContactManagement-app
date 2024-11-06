import { IContactRepository } from '../interfaces/IContactRepository';
import { Contact } from '../models/contact';
import { CustomError } from '../utils/customError';
import { CreateContactDTO } from '../interfaces/DTOs/createContactDTO';
import { ContactDTO } from '../interfaces/DTOs/contactDTO';

export class ContactService {
    private contactRepository: IContactRepository;

    constructor(contactRepository: IContactRepository) {
        this.contactRepository = contactRepository;
    }

    public async getContactsByUserId(userId: number): Promise<Contact[]> {
        const contacts = await this.contactRepository.getContactsByUserId(userId);
        if (!contacts) {
            throw new CustomError('No contacts found', 404);
        }
        return contacts;
    }

    public async createContact(contactData: CreateContactDTO): Promise<Contact> {
        const newContact = await this.contactRepository.createContact(contactData);
        return newContact;
    }

    public async updateContact(contactData: ContactDTO): Promise<Contact> {
        const { id: contactId, userId } = contactData; 
        const contact = await this.contactRepository.getContactById(contactId);

        if (contact.userId !== userId) { 
            throw new CustomError('Unauthorized access to contact', 403);
        }

        const updatedContact = await this.contactRepository.updateContact(contact);
        
        return updatedContact;
    }

    public async deleteContact(contactId: number): Promise<void> {
        const contact = await this.contactRepository.getContactById(contactId);
        await this.contactRepository.deleteContact(contactId);
    }
}