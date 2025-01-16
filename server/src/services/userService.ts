import { IUserRepository } from "../interfaces/IUserRepository";
import { CustomError } from "../utils/customError";
import { CreateUserDTO } from "../interfaces/DTOs/createUserDTO";
import { UserDTO } from "../interfaces/DTOs/userDTO";
import jwt from "jsonwebtoken";
import { User } from "../models/user";

export class UserService {
    private userRepository: IUserRepository;

    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    public async login(email: string, password: string): Promise<string> {
        const userRecord = await this.userRepository.getUserByEmail(email);
        const user = new User(userRecord.id, userRecord.email, userRecord.password);

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
        const userRecord = await this.userRepository.getUserById(userId);
        const user = new User(userRecord.id, userRecord.email, userRecord.password);

        const { password, ...userInfo } = user;
        return userInfo;
    }

    public async createUser(email: string, password: string): Promise<User> {
        const userId = await this.userRepository.createUser(email, password);
        return new User(userId, email, password);
    }
}
