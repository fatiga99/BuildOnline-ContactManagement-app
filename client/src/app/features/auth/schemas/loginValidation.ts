import * as Yup from 'yup';

export const loginValidationSchema = Yup.object({
    email: Yup.string()
        .email('Invalid email format')
        .required('Email is required'),
    password: Yup.string()
        .min(8, 'Password must have at least 8 characters, including letters and numbers')
        .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, 'Password must have at least 8 characters, including letters and numbers')
        .required('Password is required'),
});