import { OkPacket, RowDataPacket } from "mysql2";
import pool from "..";
import { Contact } from "../models/contact";
import { IContactRepository } from "../interfaces/IContactRepository";
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

        return contactRecords.map(row => ({
            id: row.id,
            name: row.name,
            email: row.email,
            phoneNumber: row.phoneNumber,
            address: row.address,
            profilePicture: row.profilePicture, 
            userId: row.userId
        }));
    }

    public async getContactById(contactId: number): Promise<Contact | null> {
        const [contactRecords] = await pool.query<RowDataPacket[]>(
            `SELECT * 
             FROM contact 
             WHERE id = ?`, 
            [contactId]
        );

        if (contactRecords.length === 0) {
            return null;
        }

        const row = contactRecords[0];
        return {
            id: row.id,
            name: row.name,
            email: row.email,
            phoneNumber: row.phoneNumber,
            address: row.address,
            profilePicture: row.profilePicture, 
            userId: row.userId
        };
    }

    public async createContact(contact: Contact): Promise<number> {
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
    
        const [result] = await pool.query<OkPacket>(query, values);
    
        return result.insertId;
    }

    public async updateContact(contact: Contact): Promise<void> {
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
    
        const [updateResult] = await pool.query<OkPacket>(query, values);

        if (updateResult.affectedRows === 0) {
            throw new CustomError('Contact not found or not updated', 404);
        }
    }

    public async deleteContact(contactId: number): Promise<void> {
        const [result] = await pool.query<OkPacket>(
            `DELETE FROM contact 
             WHERE id = ?`, 
            [contactId]
        );

        if (result.affectedRows === 0) {
            throw new CustomError('Contact not found or already deleted', 404);
        }
    }
}
