import { ButtonHTMLAttributes } from "react";

interface BaseButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'delete' | 'loginSmall'; 
    className?: string; 
}

const BaseButton: React.FC<BaseButtonProps> = ({ variant = 'primary', className, children, ...props }) => {
    const baseStyles = 'rounded-[60px] transition-colors font-public-sans font-medium  text-white text-white';

    const variants = {
        primary: 'bg-[#9378FF] hover:bg-purple-600  text-[18px] leading-[21.15px]',
        delete: 'bg-[#FF7878] hover:bg-red-600 px-6 py-2  text-[18px]',
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
