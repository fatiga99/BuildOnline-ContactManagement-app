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
exports.UserRepository = void 0;
const client_1 = require("@prisma/client");
const customError_1 = require("../utils/customError");
const prisma = new client_1.PrismaClient();
class UserRepository {
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma.user.findUnique({
                where: { id },
            });
            if (!user) {
                throw new customError_1.CustomError("User not found", 404);
            }
            return user;
        });
    }
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma.user.findUnique({
                where: { email },
            });
            if (!user) {
                throw new customError_1.CustomError("User not found", 404);
            }
            return user;
        });
    }
    createUser(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma.user.create({
                data: { email, password },
            });
            return user.id;
        });
    }
}
exports.UserRepository = UserRepository;
