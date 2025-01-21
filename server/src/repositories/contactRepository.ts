import { PrismaClient, contact as Contact } from "@prisma/client";
import { IContactRepository } from "../interfaces/IContactRepository";
import { CustomError } from "../utils/customError";
import { PaginationParameters } from "../interfaces/iPaginationParameters";

const prisma = new PrismaClient();

export class ContactRepository implements IContactRepository {

    public async getContactsByUserIdWithPagination(
        parameters: PaginationParameters
    ): Promise<{ data: Contact[]; total: number }> {
        const { userId, searchTerm, page, limit } = parameters;
        const offset = (page - 1) * limit;

        const data = await prisma.contact.findMany({
            where: {
                userId,
                name: {
                    contains: searchTerm,
                },
            },
            skip: offset,
            take: limit,
        });

        const total = await this.getContactsCount({ userId, searchTerm });

        return { data, total };
    }

    public async getContactsCount(parameters: { userId: number; searchTerm: string }): Promise<number> {
        const { userId, searchTerm } = parameters;

        return await prisma.contact.count({
            where: {
                userId,
                name: {
                    contains: searchTerm,
                },
            },
        });
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
