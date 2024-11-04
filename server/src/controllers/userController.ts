import { NextFunction, Request, Response } from 'express';
import { UserRepository } from '../repositories/userRepository';
import { UserDTO } from '../interfaces/DTOs/userDTO';
import {CreateUserDTO } from '../interfaces/DTOs/createUserDTO';
import jwt from 'jsonwebtoken';
import { IUserRepository } from '../interfaces/IUserRepository';
import { CustomError } from '../utils/customError';

export class UserController{
    private userRepository: IUserRepository;

    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    public async login(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { email, password } = req.body as CreateUserDTO;

            const user = await this.userRepository.getUserByEmail(email);
            if ( !user || user.password !== password) {
                return next(new CustomError('Invalid credentials', 401));
            }

            const token = jwt.sign(
                { id: user.id, email: user.email },
                process.env.JWT_SECRET as string,
                { expiresIn: '1h' }
            );

            res.json({ token });
        } 
        catch (error) {
            next(error);
        }
    }

    public async getUserInfo(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userId = req.user.id;
            if ( !userId) {
                return next(new CustomError('User ID is missing', 400));
            }

            const user = await this.userRepository.getUserById(userId);
            if ( !user) {
                return next(new CustomError('User not found', 404));
            }

            const { password, ...userInfo } = user;
            res.json(userInfo);
        } 
        catch (error) {
            next(error);
        }
    }
}
