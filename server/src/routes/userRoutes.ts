import express from 'express';
import { UserController } from '../controllers/userController';
import { UserRepository } from '../repositories/userRepository';
import { authMiddleware } from '../middleware/authMiddleware';
import { UserService } from '../services/userService';

const userRouter = express.Router();
const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

userRouter.get('/user', authMiddleware, userController.getUserInfo.bind(userController));

export default userRouter;
