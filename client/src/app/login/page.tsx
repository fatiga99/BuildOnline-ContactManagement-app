import React from 'react';
import LoginForm from '@/app/features/auth/components/loginForm';

const LoginPage: React.FC = () => {
    return (
        <div className="flex flex-col items-center  mt-[10.625rem] md:mt-[12.3125rem]  space-y-6">
            <h1 className="text-[39px] font-black leading-[51.68px] text-[#120E21] h-[52px] text-center font-redhat">
                Welcome
            </h1>
            <LoginForm />
        </div>
    );
};

export default LoginPage; 

