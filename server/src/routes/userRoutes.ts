import express from 'express';
import { UserController } from '../controllers/userController';
import { UserRepository } from '../repositories/userRepository';
import { authMiddleware } from '../middleware/authMiddleware';

const userRouter = express.Router();
const userRepository = new UserRepository();
const userController = new UserController(userRepository);

userRouter.get('/user', authMiddleware, userController.getUserInfo.bind(userController));

export default userRouter;
