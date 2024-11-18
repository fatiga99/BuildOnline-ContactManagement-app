import React from 'react';
import LoginForm from '@/app/features/auth/components/loginForm';

const LoginPage: React.FC = () => {
    return (
        <div className="flex flex-col items-center mt-[197px] space-y-6 ">
            <h1 className="text-[39px] font-bxzlack leading-[51.68px] text-[#120E21] w-[174px] h-[52px] text-center font-redhat">
                Welcome
            </h1>
            <LoginForm />
        </div>
    );
};

export default LoginPage;