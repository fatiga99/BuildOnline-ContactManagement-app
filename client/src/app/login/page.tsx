import React from 'react';
import LoginForm from '@/app/features/auth/components/loginForm';

const LoginPage: React.FC = () => {
    return (
        <div>
            <h1>Login</h1>
            <LoginForm />
        </div>
    );
};

export default LoginPage;