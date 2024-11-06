import { OkPacket, RowDataPacket } from "mysql2";
import pool from "..";
import { Contact } from "../models/contact";
import { IContactRepository } from "../interfaces/IContactRepository";
import { CreateContactDTO } from "../interfaces/DTOs/createContactDTO";
import { CustomError } from "../utils/customError";

export class ContactRepository implements IContactRepository {

    public async getContactsByUserId(userId: number): Promise<Contact[]> {
        const [contactRecords] = await pool.query<RowDataPacket[]>(
            `SELECT * 
             FROM contact 
             WHERE userId = ?`, 
            [userId]
        );

        if (contactRecords.length === 0) {
            return [];
        }

        const contacts = contactRecords.map((row: RowDataPacket) => new Contact(
            row.id, row.name, row.email, row.phoneNumber, row.address, row.profilePicture, row.userId
        ));

        return contacts;
    }

    public async getContactById(contactId: number): Promise<Contact> {

        const [contactRecords] = await pool.query<RowDataPacket[]>(
            `SELECT * 
             FROM contact 
             WHERE id = ?`, 
            [contactId]
        );

        if (contactRecords.length === 0) {
            throw new CustomError('Contact not found', 404);
        }

        const contactRow = contactRecords[0];
        const newContact = new Contact(
            contactRow.id, 
            contactRow.name, 
            contactRow.email, 
            contactRow.phoneNumber, 
            contactRow.address, 
            contactRow.profilePicture, 
            contactRow.userId
        );

        return newContact;
    }


    public async createContact(contact: CreateContactDTO): Promise<Contact> {
        const query = `
            INSERT INTO contact (name, email, phoneNumber, address, profilePicture, userId) 
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        const values = [
            contact.name, 
            contact.email, 
            contact.phoneNumber, 
            contact.address, 
            contact.profilePicture, 
            contact.userId
        ];

        const [insertContactResult] = await pool.query<RowDataPacket[]>(query, values);
        const insertId = (insertContactResult as RowDataPacket).insertId;

        const newContact = new Contact(
            insertId, 
            contact.name, 
            contact.email, 
            contact.phoneNumber, 
            contact.address, 
            contact.profilePicture, 
            contact.userId
        );

        return newContact;
    }

    public async updateContact( contact: Contact): Promise<Contact> {
        const query = `
            UPDATE contact 
            SET name = ?, 
            email = ?, 
            phoneNumber = ?, 
            address = ?, 
            profilePicture = ?
            WHERE id = ? AND userId = ? 
        `;
        const values = [
            contact.name, 
            contact.email, 
            contact.phoneNumber, 
            contact.address, 
            contact.profilePicture,
            contact.id,
            contact.userId
        ];
    
        const [updateContactResult] = await pool.query<OkPacket>(query, values);

        if (updateContactResult.affectedRows === 0) {
            throw new CustomError('Contact not found or not updated', 404);
        }

        return contact;
    }

    public async deleteContact(contactId: number): Promise<void> {
        await pool.query(
            `DELETE FROM contact 
             WHERE id = ?`, 
            [contactId]
        );
    }
}
