"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUser = exports.userSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const userValidationMessages = {
    email: {
        invalidFormat: 'Invalid email format',
        required: 'Email is required'
    },
    password: {
        patternMismatch: 'Password must have at least 8 characters, including letters and numbers',
        required: 'Password is required'
    }
};
const emailValidation = () => joi_1.default.string()
    .email()
    .required()
    .messages({
    'string.email': userValidationMessages.email.invalidFormat,
    'any.required': userValidationMessages.email.required
});
const passwordValidation = () => joi_1.default.string()
    .pattern(new RegExp("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$"))
    .required()
    .messages({
    'string.pattern.base': userValidationMessages.password.patternMismatch,
    'any.required': userValidationMessages.password.required
});
exports.userSchema = joi_1.default.object({
    email: emailValidation(),
    password: passwordValidation()
});
const validateUser = (req, res, next) => {
    const { error } = exports.userSchema.validate(req.body, { abortEarly: false });
    if (error) {
        res.status(400).json({ errors: error.details.map(detail => detail.message) });
        return;
    }
    next();
    return;
};
exports.validateUser = validateUser;
