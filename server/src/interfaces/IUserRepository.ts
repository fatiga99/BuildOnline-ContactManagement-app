import { user as User } from "@prisma/client";

export interface IUserRepository {
    getUserById(id: number): Promise<User>; 
    getUserByEmail(email: string): Promise<User>; 
    createUser(email: string, password: string): Promise<number>; 
}
