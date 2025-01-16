import { ResultSetHeader, RowDataPacket } from "mysql2";
import { IUserRepository } from "../interfaces/IUserRepository";
import pool from "..";
import { CustomError } from "../utils/customError";

export class UserRepository implements IUserRepository {
    public async getUserById(id: number): Promise<RowDataPacket> {
        const [userRecords] = await pool.query<RowDataPacket[]>(
            `SELECT * 
             FROM user 
             WHERE id = ?`, 
            [id]
        );

        if (userRecords.length === 0) {
            throw new CustomError('User not found', 404);
        }

        return userRecords[0];
    }

    public async getUserByEmail(email: string): Promise<RowDataPacket> {
        const [userRecords] = await pool.query<RowDataPacket[]>(
            `SELECT * 
             FROM user 
             WHERE email = ?`, 
            [email]
        );

        if (userRecords.length === 0) {
            throw new CustomError('User not found', 404);
        }

        return userRecords[0];
    }

    public async createUser(email: string, password: string): Promise<number> {
        const query = `
            INSERT INTO user (email, password) 
            VALUES (?, ?)
        `;
        const values = [email, password];

        const [result] = await pool.query<ResultSetHeader>(query, values);

        return result.insertId; 

    }
}
