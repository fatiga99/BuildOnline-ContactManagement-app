import express from 'express';
import { UserController } from '../controllers/UserController';
import { validateUser } from '../middleware/userValidator';

const authRouter = express.Router();

authRouter.post('/login', validateUser, UserController.login);

export default authRouter;
