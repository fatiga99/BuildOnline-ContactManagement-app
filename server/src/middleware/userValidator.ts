import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

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

const emailValidation = () => Joi.string()
.email()
.required()
.messages({
    'string.email': userValidationMessages.email.invalidFormat,
    'any.required': userValidationMessages.email.required
});

const passwordValidation = () => Joi.string()
.pattern(new RegExp("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$"))
.required()
.messages({
    'string.pattern.base': userValidationMessages.password.patternMismatch,
    'any.required': userValidationMessages.password.required
});

export const userSchema = Joi.object({
    email: emailValidation(),
    password: passwordValidation()
});


export const validateUser = (req: Request, res: Response, next: NextFunction) => {
    const { error } = userSchema.validate(req.body, { abortEarly: false });
    if (error) {
        return res.status(400).json({ errors: error.details.map(detail => detail.message) });
    }
    next();
};
