import { PrismaClient } from "@prisma/client";
import { user as User } from "@prisma/client";
import { IUserRepository } from "../interfaces/IUserRepository";
import { CustomError } from "../utils/customError";

const prisma = new PrismaClient();

export class UserRepository implements IUserRepository {
    public async getUserById(id: number): Promise<User> {
        const user = await prisma.user.findUnique({
            where: { id },
        });

        if (!user) {
            throw new CustomError("User not found", 404);
        }

        return user;
    }

    public async getUserByEmail(email: string): Promise<User> {
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            throw new CustomError("User not found", 404);
        }

        return user;
    }

    public async createUser(email: string, password: string): Promise<number> {
        const user = await prisma.user.create({
            data: { email, password },
        });

        return user.id;
    }
}
