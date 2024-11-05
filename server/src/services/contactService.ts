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

    public async updateContact(contactData: ContactDTO): Promise<void> {
        const contactId = contactData.id;
        const contact = await this.contactRepository.getContactById(contactId);
        if (!contact) {
            throw new CustomError('Contact not found', 404);
        }
        await this.contactRepository.updateContact(contact);
    }

    public async deleteContact(contactId: number): Promise<void> {
        const contact = await this.contactRepository.getContactById(contactId);
        if (!contact) {
            throw new CustomError('Contact not found', 404);
        }
        await this.contactRepository.deleteContact(contactId);
    }
}