import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

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

const nameValidation = () => Joi.string()
    .min(1)
    .required()
    .messages({
        'any.required': contactValidationMessages.name.required
    });

const emailValidation = () => Joi.string()
    .email()
    .required()
    .messages({
        'string.email': contactValidationMessages.email.invalidFormat,
        'any.required': contactValidationMessages.email.required
    });

const phoneNumberValidation = () => Joi.string()
    .pattern(new RegExp(/^\+?[0-9]{9,15}$/))
    .required()
    .messages({
        'string.pattern.base': contactValidationMessages.phoneNumber.patternMismatch,
        'any.required': contactValidationMessages.phoneNumber.required
    });

    const profilePictureValidation = () => Joi.alternatives()
    .try(
        Joi.string().uri().messages({
            'string.uri': 'Profile picture must be a valid URL'
        }),
        Joi.binary().messages({
            'binary.base': 'Profile picture must be a valid binary file'
        })
    )
    .required()
    .messages({
        'any.required': 'Profile picture is required'
    });



const addressValidation = () => Joi.string()
    .min(1)
    .required()
    .messages({
        'any.required': contactValidationMessages.address.required
    });

export const contactSchema = Joi.object({
    name: nameValidation(),
    email: emailValidation(),
    phoneNumber: phoneNumberValidation(),
    profilePicture: profilePictureValidation(),
    address: addressValidation()
});

export const validateContact = (req: Request, res: Response, next: NextFunction): void => {
    const { error } = contactSchema.validate(req.body, { abortEarly: false });
    if (error) {
        console.error('Validation error:', error.details.map((d) => d.message));
        res.status(400).json({ errors: error.details.map(detail => detail.message) });
        return;
    }
    next();
    return;
};
