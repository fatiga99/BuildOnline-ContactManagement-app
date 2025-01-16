import { ButtonHTMLAttributes } from "react";
import { cva } from "class-variance-authority"

interface BaseButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'delete' | 'loginSmall'; 
    className?: string; 
}

const BaseButton: React.FC<BaseButtonProps> = ({ variant = 'primary', className, children, ...props }) => {
    const baseStyles = '';
    const variants = {
        primary: '',
        delete: '',
        loginSmall: '',
    };

    return (
        <button 
        className={`${baseStyles} ${variants[variant]} ${className}`}
        {...props}
        >
            {children}
        </button>
    );
};

export default BaseButton;
