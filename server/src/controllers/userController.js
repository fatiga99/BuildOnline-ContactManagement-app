"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const customError_1 = require("../utils/customError");
class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const token = yield this.userService.login(email, password);
                res.json({ token });
            }
            catch (error) {
                next(error);
            }
        });
    }
    getUserInfo(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                if (!userId) {
                    return next(new customError_1.CustomError("User ID is missing", 400));
                }
                const userInfo = yield this.userService.getUserInfo(userId);
                res.json(userInfo);
            }
            catch (error) {
                next(error);
            }
        });
    }
    createUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const user = yield this.userService.createUser(email, password);
                res.status(201).json(user);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.UserController = UserController;
