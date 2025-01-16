import { ButtonHTMLAttributes } from "react";
import { cva } from "class-variance-authority"

interface BaseButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'delete' | 'loginSmall'; 
    className?: string; 
}

const BaseButton: React.FC<BaseButtonProps> = ({ variant = 'primary', className, children, ...props }) => {
    const baseStyles = 'px-6 py-2 rounded-full transition-colors font-medium';

    const variants = {
        primary: 'bg-[#9378FF] hover:bg-purple-600 text-white text-[18px] leading-[21.15px]',
        delete: 'bg-[#FF7878] hover:bg-red-600 text-white',
        loginSmall: '',
    };

    const buttonClasses = `${baseStyles} ${variants[variant]} ${className || ''}`.trim();

    return (
        <button className={buttonClasses} {...props}>
            {children}
        </button>
    );
};

export default BaseButton;
