import { FieldPacket, RowDataPacket } from "mysql2";
import {IUserRepository} from "../interfaces/IUserRepository";
import pool from "..";
import { User } from "../models/user";
import { CustomError } from "../utils/customError";

export class UserRepository implements IUserRepository  {

    public async getUserById(id: number): Promise<User> {
        const [userRecords] = await pool.query<RowDataPacket[]>(
            `SELECT * 
             FROM user 
             WHERE id = ?`, 
            [id]
        );

        if (userRecords.length === 0) {
            throw new CustomError('User not found', 404);
        }

        const userRow = userRecords[0];
        const newUser = new User(userRow.id, userRow.email, userRow.password);
        return newUser;
    }

    public async getUserByEmail(email: string): Promise<User> {
        const [userRecords] = await pool.query<RowDataPacket[]>(
            `SELECT * 
             FROM user 
             WHERE email = ?`, 
            [email]
        );

        if (userRecords.length === 0) {
            throw new CustomError('User not found', 404);
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
