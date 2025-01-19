"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const userRepository_1 = require("../repositories/userRepository");
const userValidator_1 = require("../middleware/userValidator");
const userService_1 = require("../services/userService");
const authRouter = express_1.default.Router();
const userRepository = new userRepository_1.UserRepository();
const userService = new userService_1.UserService(userRepository);
const userController = new userController_1.UserController(userService);
authRouter.post('/', userValidator_1.validateUser, userController.login.bind(userController));
exports.default = authRouter;
