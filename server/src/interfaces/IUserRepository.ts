import { RowDataPacket } from "mysql2";

export interface IUserRepository {
    getUserById(id: number): Promise<RowDataPacket>; 
    getUserByEmail(email: string): Promise<RowDataPacket>; 
    createUser(email: string, password: string): Promise<number>; 
}
