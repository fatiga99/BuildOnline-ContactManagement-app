import express from 'express';
import { UserController } from '../controllers/UserController';
import { authMiddleware } from '../middleware/authMiddleware';

const userRouter = express.Router();

userRouter.get('/user', authMiddleware, UserController.getUserInfo);

export default userRouter;
