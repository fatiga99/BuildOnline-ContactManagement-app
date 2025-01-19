"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const userRepository_1 = require("../repositories/userRepository");
const authMiddleware_1 = require("../middleware/authMiddleware");
const userService_1 = require("../services/userService");
const userRouter = express_1.default.Router();
const userRepository = new userRepository_1.UserRepository();
const userService = new userService_1.UserService(userRepository);
const userController = new userController_1.UserController(userService);
userRouter.get('/user', authMiddleware_1.authMiddleware, userController.getUserInfo.bind(userController));
exports.default = userRouter;
