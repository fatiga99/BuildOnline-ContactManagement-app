import { User } from "../models/user";

export interface IUserRepository {
    getUserById(id: number): Promise<User>;
    getUserByEmail(email: string): Promise<User>;
    createUser(email: string, password: string): Promise<User>;
}