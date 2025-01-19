import { contact as Contact } from "@prisma/client";
import { IContactRepository } from "../interfaces/IContactRepository";
import { CustomError } from "../utils/customError";
import { CreateContactDTO } from "../interfaces/DTOs/createContactDTO";
import { ContactDTO } from "../interfaces/DTOs/contactDTO";
import axios from "axios";

export class ContactService {
    private contactRepository: IContactRepository;

    constructor(contactRepository: IContactRepository) {
        this.contactRepository = contactRepository;
    }

    public async getContactsByUserId(userId: number): Promise<Contact[]> {
        return await this.contactRepository.getContactsByUserId(userId);
    }

    public async createContact(contactData: CreateContactDTO): Promise<Contact> {
        contactData.profilePicture = await this.normalizeProfilePicture(contactData.profilePicture);

        const createdContactId = await this.contactRepository.createContact(contactData);

        return {
            ...contactData,
            id: createdContactId,
        };
    }

    public async updateContact(contactData: ContactDTO): Promise<Contact> {
        const existingContact = await this.contactRepository.getContactById(contactData.id);

        if (!existingContact || existingContact.userId !== contactData.userId) {
            throw new CustomError("Unauthorized or contact not found", 403);
        }

        contactData.profilePicture = await this.normalizeProfilePicture(contactData.profilePicture);

        await this.contactRepository.updateContact(contactData as Contact);

        return contactData as Contact;
    }

    public async deleteContact(contactId: number): Promise<void> {
        const contact = await this.contactRepository.getContactById(contactId);

        if (!contact) {
            throw new CustomError("Contact not found", 404);
        }

        await this.contactRepository.deleteContact(contactId);
    }

    private async downloadAndConvertProfilePicture(profilePicture: string): Promise<Uint8Array> {
        try {
            const response = await axios.get(profilePicture, { responseType: "arraybuffer" });
            const responseUnit8Array =  new Uint8Array(response.data); 
            return responseUnit8Array;
        } catch (error) {
            throw new CustomError("Error downloading image from Cloudinary", 500);
        }
    }

    private async normalizeProfilePicture(profilePicture: string | Buffer | Uint8Array | null): Promise<Uint8Array | null> {
        if (typeof profilePicture === "string") {
            return await this.downloadAndConvertProfilePicture(profilePicture);
        }

        if (profilePicture instanceof Buffer) {
            return new Uint8Array(profilePicture);
        }

        return profilePicture;
    }
}
