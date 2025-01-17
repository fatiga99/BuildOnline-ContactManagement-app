import { ButtonHTMLAttributes } from "react";

interface BaseButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'delete' | 'loginSmall' | 'Contacts'; 
    className?: string; 
}

const BaseButton: React.FC<BaseButtonProps> = ({ variant = 'primary', className, children, ...props }) => {
    const baseStyles = 'rounded-[60px] transition-colors font-public-sans font-medium ';

    const variants = {
        primary: 'bg-[#9378FF] hover:bg-purple-600  text-[18px] leading-[21.15px] text-white',
        delete: 'bg-[#FF7878] hover:bg-red-600 px-6 py-2  text-[18px] text-white',
        loginSmall: 'text-[16px] leading-[40px] font-sans w-[47px] h-[40px] text-black decoration-none hover:text-gray-600',
        Contacts: 'text-[16px] leading-[40px] font-sans w-[70px] h-[40px] text-[#3A3A3A] decoration-none hover:text-gray-600'
    };

    const buttonClasses = `${baseStyles} ${variants[variant]} ${className || ''}`.trim();

    return (
        <button className={buttonClasses} {...props}>
            {children}
        </button>
    );
};

export default BaseButton;
