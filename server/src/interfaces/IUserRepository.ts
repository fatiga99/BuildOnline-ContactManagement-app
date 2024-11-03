import { User } from "../models/User";


export interface IUserRepository {
    getUserById(id: number): Promise<User | null>;
    getUserByEmail(email: string): Promise<User | null>;
    createUser(email: string, password: string): Promise<User>;
}