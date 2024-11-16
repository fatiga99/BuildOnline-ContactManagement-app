import { IContactRepository } from '../interfaces/IContactRepository';
import { Contact } from '../models/contact';
import { CustomError } from '../utils/customError';
import { CreateContactDTO } from '../interfaces/DTOs/createContactDTO';
import { ContactDTO } from '../interfaces/DTOs/contactDTO';
import axios from 'axios';

export class ContactService {
    private contactRepository: IContactRepository;

    constructor(contactRepository: IContactRepository) {
        this.contactRepository = contactRepository;
    }

    public async getContactsByUserId(userId: number): Promise<Contact[]> {
        const contactsData = await this.contactRepository.getContactsByUserId(userId);

        return contactsData.map(data => new Contact(
            data.id,
            data.name,
            data.email,
            data.phoneNumber,
            data.address,
            data.profilePicture,
            data.userId
        ));
    }

    public async createContact(contactData: CreateContactDTO): Promise<Contact> {
        if (typeof contactData.profilePicture === 'string') {
            contactData.profilePicture = await this.processProfilePicture(contactData.profilePicture);
        }
    
        const newContact = new Contact(
            0,
            contactData.name,
            contactData.email,
            contactData.phoneNumber,
            contactData.address,
            contactData.profilePicture as Buffer,
            contactData.userId
        );
    
        const createdContactId = await this.contactRepository.createContact(newContact);
        
        newContact.id = createdContactId;
    
        return newContact;
    }
    

    public async updateContact(contactData: ContactDTO): Promise<Contact> {
        const existingContact = await this.contactRepository.getContactById(contactData.id);

        if (!existingContact || existingContact.userId !== contactData.userId) {
            throw new CustomError('Unauthorized or contact not found', 403);
        }

        if (typeof contactData.profilePicture === 'string') {
            contactData.profilePicture = await this.processProfilePicture(contactData.profilePicture);
        }

        const updatedContact = new Contact(
            contactData.id,
            contactData.name,
            contactData.email,
            contactData.phoneNumber,
            contactData.address,
            contactData.profilePicture as Buffer,
            contactData.userId
        );

        await this.contactRepository.updateContact(updatedContact);

        return updatedContact;
    }

    public async deleteContact(contactId: number): Promise<void> {
        const contact = await this.contactRepository.getContactById(contactId);

        if (!contact) {
            throw new CustomError('Contact not found', 404);
        }

        await this.contactRepository.deleteContact(contactId);
    }

    private async processProfilePicture(profilePicture: string): Promise<Buffer> {
        try {
            const response = await axios.get(profilePicture, { responseType: 'arraybuffer' });
            const profilePictureBuffer = Buffer.from(response.data); 
            return profilePictureBuffer;
        } 
        catch (error) {
            throw new CustomError('Error downloading image from Cloudinary', 500);
        }
    }
}
