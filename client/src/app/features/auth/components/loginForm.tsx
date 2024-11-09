"use client";

import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../authSlice';
import Cookies from 'js-cookie';

const LoginForm: React.FC = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    const validationSchema = Yup.object({
        email: Yup.string()
            .email('Invalid email format')  
            .required('Email is required'), 
        password: Yup.string()
            .min(8, 'Password must have at least 8 characters, including letters and numbers') 
            .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, 'Password must have at least 8 characters, including letters and numbers')
            .required('Password is required'), 
    });

    const { values, errors, touched, handleChange,
        handleBlur, handleSubmit, isSubmitting } = useFormik({
        initialValues: { email: '', password: '' },
        validationSchema,
        onSubmit: async (values, { setSubmitting }) => {
            try {
                const response = await axios.post('http://localhost:5001/api/login', values);
                const { token, user } = response.data;

                Cookies.set('token', token, { expires: 1 });

                dispatch(loginSuccess({ token, user }));

                router.push('/contacts');
            } catch (error) {
                console.error('Login failed', error);
            }
            setSubmitting(false);
        },
    });


    return (
        <form onSubmit={handleSubmit}>
            <label>Email</label>
            <input
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
            />
            {touched.email && errors.email && <div>{errors.email}</div>}

    <label>Password</label>
    <input
        type="password"
        name="password"
        value={values.password}
        onChange={handleChange}
        onBlur={handleBlur}
    />
    {touched.password && errors.password && <div>{errors.password}</div>}

            <button type="submit" disabled={isSubmitting}>Login</button>
        </form>
    );
};

export default LoginForm;
