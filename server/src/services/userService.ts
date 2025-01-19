import { IUserRepository } from "../interfaces/IUserRepository";
import { CustomError } from "../utils/customError";
import { UserDTO } from "../interfaces/DTOs/userDTO";
import jwt from "jsonwebtoken";
import { user as User } from "@prisma/client"; 

export class UserService {
    private userRepository: IUserRepository;

    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    public async login(email: string, password: string): Promise<string> {
        const user = await this.userRepository.getUserByEmail(email);

        if (user.password !== password) {
            throw new CustomError("Invalid credentials", 401);
        }

        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET as string,
            { expiresIn: "1h" }
        );

        return token;
    }

    public async getUserInfo(userId: number): Promise<Omit<UserDTO, "password">> {
        const user = await this.userRepository.getUserById(userId);

        const { password, ...userInfo } = user;
        return userInfo; 
    }

    public async createUser(email: string, password: string): Promise<User> {
        const userId = await this.userRepository.createUser(email, password);

        return {
            id: userId,
            email,
            password,
        }; 
    }
}
