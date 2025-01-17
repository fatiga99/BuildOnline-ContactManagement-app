"use client";

import React from 'react';
import { loginValidationSchema } from '../schemas/loginValidation';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../authSlice';
import Cookies from 'js-cookie';
import { useFormik } from 'formik';
import BaseButton from '@/app/components/baseButton';

const LoginForm: React.FC = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    const { values, errors, touched, handleChange,
        handleBlur, handleSubmit, isSubmitting } = useFormik({
        initialValues: { email: '', password: '' },
        validationSchema: loginValidationSchema,
        onSubmit: async (values, { setSubmitting }) => {
            try {
                const response = await axios.post('http://localhost:5001/api/login', values);
                const { token, user } = response.data;

                Cookies.set('token', token, { expires: 1 });

                dispatch(loginSuccess({ token, user }));

                router.push('/features/contacts');
            } 
            catch (error) {
                console.error('Login failed', error);
            }
            setSubmitting(false);
        },
    });


    return (
        <div className="flex flex-col items-center space-y-8 md:space-y-16">
            <form 
            onSubmit={handleSubmit}
            className="flex flex-col items-center space-y-6 md:space-y-12 ">
                <div className="max-w-[775px] flex flex-col w-full  mt-[38px] md:mt-20 text-[16px] font-public-sans text-[#99879D] leading-[18.8px]">
                    <input
                        type="email"
                        name="email"
                        placeholder="john@doe.com"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="w-[343px] md:w-[775px] h-[56px] rounded-md bg-[#FBEEFF] backdrop-blur-[40px] p-4 focus:outline-none"
                    />
                    {touched.email && errors.email && <div className="text-red-500 text-sm mt-[10px]">{errors.email}</div>}

                    <input
                        type="password"
                        name="password"
                        placeholder="john@doe.com"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="w-[343px] md:w-[775px] h-[56px] rounded-md bg-[#FBEEFF] backdrop-blur-[40px] p-4 mt-[30px] focus:outline- mb-[38px] md:mb-20"
                    />
                    {touched.password && errors.password && <div className="text-red-500 text-sm mt-[10px]">{errors.password}</div>}
                </div>

                <div className='mt-[38px] md:mt-[89px]'>
                <BaseButton 
                    type="submit" 
                    disabled={isSubmitting}
                    variant="primary"
                    className="w-[263px] h-[58.12px]">
                    <span className="block w-[53px] h-[23px] mx-auto">
                        Login
                    </span>
                </BaseButton>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;