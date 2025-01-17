import { InputHTMLAttributes } from "react";

interface BaseInputProps extends InputHTMLAttributes<HTMLInputElement> {
    variant?: 'loginForm' | 'contactForm' ; 
    className?: string; 
}

const BaseInput: React.FC<BaseInputProps> = ({ variant = 'loginForm', className, children, ...props }) => {
    const baseStyles = 'h-[56px] bg-[#FBEEFF] backdrop-blur-[40px] focus:outline-none';

    const variants = {
        loginForm: 'w-[343px] md:w-[775px]  rounded-md  p-4',
        contactForm: 'p-2 border rounded-[8px] text-[16px] text-[#99879D] leading-[18.8px] font-public-sans'
    };

    const InputClasses = `${baseStyles} ${variants[variant]} ${className || ''}`.trim();

    return (
        <input className={InputClasses} {...props}>
            {children}
        </input>
    );
};

export default BaseInput;
