import { RowDataPacket } from "mysql2";
import pool from "..";
import { Contact } from "../models/contact";
import { IContactRepository } from "../interfaces/IContactRepository";

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

    public async createContact(contact: Contact): Promise<Contact> {
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

    public async updateContact(contactId: number, contact: Contact): Promise<void> {
        const query = `
            UPDATE contact 
            SET name = ?, 
                email = ?, 
                phoneNumber = ?, 
                address = ?, 
                profilePicture = ?, 
                userId = ?
            WHERE id = ?
        `;
        const values = [
            contact.name, 
            contact.email, 
            contact.phoneNumber, 
            contact.address, 
            contact.profilePicture,
            contact.userId,
            contactId
        ];
    
        await pool.query(query, values);
    }

    public async deleteContact(contactId: number): Promise<void> {
        await pool.query(
            `DELETE FROM contact 
             WHERE id = ?`, 
            [contactId]
        );
    }
}
