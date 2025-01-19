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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const customError_1 = require("../utils/customError");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.getUserByEmail(email);
            if (user.password !== password) {
                throw new customError_1.CustomError("Invalid credentials", 401);
            }
            const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
            return token;
        });
    }
    getUserInfo(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.getUserById(userId);
            const { password } = user, userInfo = __rest(user, ["password"]);
            return userInfo;
        });
    }
    createUser(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = yield this.userRepository.createUser(email, password);
            return {
                id: userId,
                email,
                password,
            };
        });
    }
}
exports.UserService = UserService;
