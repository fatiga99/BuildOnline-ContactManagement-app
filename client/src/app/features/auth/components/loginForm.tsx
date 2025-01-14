"use client";

import React from 'react';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../authSlice';
import Cookies from 'js-cookie';
import { loginValidationSchema } from '../schemas/loginValidation';

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
        <div className="flex flex-col items-center mt-[89px]">
            <form 
            onSubmit={handleSubmit}
            className="flex flex-col items-center space-y-[89px] ">
                <div className="flex flex-col w-full  mt-[89px] mb-[89px] text-[16px] font-public-sans text-[#99879D] leading-[18.8px]">
                    <input
                        type="email"
                        name="email"
                        placeholder="john@doe.com"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="w-[775px] h-[56px] rounded-tl-[8px] bg-[#FBEEFF] backdrop-blur-[40px] p-4"
                    />
                    {touched.email && errors.email && <div className="text-red-500 text-sm mt-[10px]">{errors.email}</div>}

                    <input
                        type="password"
                        name="password"
                        placeholder="john@doe.com"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="w-[775px] h-[56px] rounded-tl-[8px] bg-[#FBEEFF] backdrop-blur-[40px] p-4 mt-[30px]"
                    />
                    {touched.password && errors.password && <div className="text-red-500 text-sm mt-[10px]">{errors.password}</div>}
                </div>

                <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-[263px] h-[58.12px] bg-[#9378FF] rounded-[60px] text-white font-medium text-[18px] leading-[21.15px] text-center mb-[262.88px]">
                    <span className="block w-[53px] h-[23px] mx-auto">
                        Login
                    </span>
                </button>
            </form>
        </div>
    );
};

export default LoginForm;
