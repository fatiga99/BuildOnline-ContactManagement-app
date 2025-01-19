import { PrismaClient, contact as Contact } from "@prisma/client";
import { IContactRepository } from "../interfaces/IContactRepository";
import { CustomError } from "../utils/customError";

const prisma = new PrismaClient();

export class ContactRepository implements IContactRepository {
    public async getContactsByUserId(userId: number): Promise<Contact[]> {
        const userContacts = await prisma.contact.findMany({
            where: { userId },
        });
        return userContacts; 
    }

    public async getContactById(contactId: number): Promise<Contact | null> {
        const contact = await prisma.contact.findUnique({
            where: { id: contactId },
        });
        return contact; 
    }

    public async createContact(contact: Omit<Contact, "id">): Promise<number> {
        const createdContact = await prisma.contact.create({
            data: contact,
        });
        return createdContact.id;
    }

    public async updateContact(contact: Contact): Promise<void> {
        const updatedContact = await prisma.contact.update({
            where: { id: contact.id },
            data: {
                name: contact.name,
                email: contact.email,
                phoneNumber: contact.phoneNumber,
                address: contact.address,
                profilePicture: contact.profilePicture,
            },
        });

        if (!updatedContact) {
            throw new CustomError("Contact not found or not updated", 404);
        }
    }

    public async deleteContact(contactId: number): Promise<void> {
        const deletedContact = await prisma.contact.delete({
            where: { id: contactId },
        });

        if (!deletedContact) {
            throw new CustomError("Contact not found or already deleted", 404);
        }
    }
}
