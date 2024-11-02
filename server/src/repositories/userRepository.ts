import { FieldPacket, RowDataPacket } from "mysql2";
import pool from "..";
import { User } from "../models/User";

export class UserRepository {

    public async getUserById(id: number): Promise<User | null> {
        const [userRecords] = await pool.query<RowDataPacket[]>(
            `SELECT * 
             FROM user 
             WHERE id = ?`, 
            [id]
        );

        if (userRecords.length === 0) {
            return null;
        }

        const userRow = userRecords[0];
        const newUser = new User(userRow.id, userRow.email, userRow.password);
        return newUser;
    }

    public async getUserByEmail(email: string): Promise<User | null> {
        const [userRecords] = await pool.query<RowDataPacket[]>(
            `SELECT * 
             FROM user 
             WHERE email = ?`, 
            [email]
        );

        if (userRecords.length === 0) {
            return null;
        }

        const userRow = userRecords[0];
        const newUser = new User(userRow.id, userRow.email, userRow.password);
        return newUser;
    }

    public async createUser(email: string, password: string): Promise<User> {
        const query = `
            INSERT INTO user (email, password) 
            VALUES (?, ?)
        `;
        const values = [email, password];

        const [insertUserResult] = await pool.query<RowDataPacket[]>(query, values);
        const insertId = (insertUserResult as RowDataPacket).insertId;

        const newUser = new User(insertId, email, password);
        return newUser;
    }
}
