import { FieldPacket, RowDataPacket } from "mysql2";
import pool from "..";
import { User } from "../models/user";


export class UserRepository {

    public async getUserById(id: number): Promise<User | null>{
        const [rows] = await pool.query<RowDataPacket[]>("SELECT * FROM USER WHERE id = ?", [id]);

        if(rows.length === 0){
            return null;
        }

        const userRow = rows[0];
        const newUser = new User(userRow.id, userRow.email, userRow.password);
        return newUser;
    }

    public async getUserByEmail(email: string): Promise<User | null>{
        const [rows] = await pool.query<RowDataPacket[]>("SELECT * FROM USER WHERE email = ?", [email]);

        if(rows.length === 0){
            return null;
        }

        const userRow = rows[0];
        const newUser = new User(userRow.id, userRow.email, userRow.password);
        return newUser;
    }

    public async createUser(email: string, password: string): Promise<User>{
        const [insertUserResult] = await pool.query<RowDataPacket[]>("INSERT INTO user (email, password) VALUES (?,?)", [email, password]);
        const insertId = (insertUserResult as any).insertId;
        const newUser = new User(insertId, email, password);
        return newUser;
    }
}