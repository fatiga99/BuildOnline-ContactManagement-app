import { NextFunction, Request, Response } from 'express';
import { UserService } from '../services/userService';
import { CreateUserDTO } from '../interfaces/DTOs/createUserDTO';
import { CustomError } from '../utils/customError';

export class UserController {
    private userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    }

    public async login(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { email, password } = req.body as CreateUserDTO;
            const token = await this.userService.login(email, password);
            res.json({ token });
        }
         catch (error) {
            next(error);
        }
    }

    public async getUserInfo(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userId = req.user?.id;
            if (!userId) {
                return next(new CustomError('User ID is missing', 400));
            }

            const userInfo = await this.userService.getUserInfo(userId);
            res.json(userInfo);
        } 
        catch (error) {
            next(error);
        }
    }
}
