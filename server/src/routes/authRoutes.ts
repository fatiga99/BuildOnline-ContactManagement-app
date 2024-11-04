import express from 'express';
import { UserController } from '../controllers/userController';
import { UserRepository } from '../repositories/userRepository';
import { validateUser } from '../middleware/userValidator';
import { UserService } from '../services/userService';

const authRouter = express.Router();
const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

authRouter.post('/login', validateUser, userController.login.bind(userController));

export default authRouter;
