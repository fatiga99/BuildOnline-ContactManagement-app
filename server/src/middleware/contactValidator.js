"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateContact = exports.contactSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const contactValidationMessages = {
    name: {
        required: 'Name is required'
    },
    email: {
        invalidFormat: 'Invalid email format',
        required: 'Email is required'
    },
    phoneNumber: {
        patternMismatch: 'Phone number must be between 10 and 15 digits and may include a leading +',
        required: 'Phone number is required'
    },
    address: {
        required: 'Address is required'
    }
};
const nameValidation = () => joi_1.default.string()
    .min(1)
    .required()
    .messages({
    'any.required': contactValidationMessages.name.required
});
const emailValidation = () => joi_1.default.string()
    .email()
    .required()
    .messages({
    'string.email': contactValidationMessages.email.invalidFormat,
    'any.required': contactValidationMessages.email.required
});
const phoneNumberValidation = () => joi_1.default.string()
    .pattern(new RegExp(/^\+?[0-9]{9,15}$/))
    .required()
    .messages({
    'string.pattern.base': contactValidationMessages.phoneNumber.patternMismatch,
    'any.required': contactValidationMessages.phoneNumber.required
});
const profilePictureValidation = () => joi_1.default.alternatives()
    .try(joi_1.default.string().uri().messages({
    'string.uri': 'Profile picture must be a valid URL'
}), joi_1.default.binary().messages({
    'binary.base': 'Profile picture must be a valid binary file'
}))
    .required()
    .messages({
    'any.required': 'Profile picture is required'
});
const addressValidation = () => joi_1.default.string()
    .min(1)
    .required()
    .messages({
    'any.required': contactValidationMessages.address.required
});
exports.contactSchema = joi_1.default.object({
    name: nameValidation(),
    email: emailValidation(),
    phoneNumber: phoneNumberValidation(),
    profilePicture: profilePictureValidation(),
    address: addressValidation()
});
const validateContact = (req, res, next) => {
    const { error } = exports.contactSchema.validate(req.body, { abortEarly: false });
    if (error) {
        console.error('Validation error:', error.details.map((d) => d.message));
        res.status(400).json({ errors: error.details.map(detail => detail.message) });
        return;
    }
    next();
    return;
};
exports.validateContact = validateContact;
