import express from 'express';
import { UserController } from '../controllers/userController';
import { UserRepository } from '../repositories/userRepository';
import { validateUser } from '../middleware/userValidator';

const authRouter = express.Router();
const userRepository = new UserRepository();
const userController = new UserController(userRepository);

authRouter.post('/login', validateUser, userController.login.bind(userController));

export default authRouter;
