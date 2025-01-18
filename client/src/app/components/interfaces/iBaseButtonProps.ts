import { ButtonHTMLAttributes } from "react";

export interface BaseButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'delete' | 'loginSmall' | 'Contacts'; 
    className?: string; 
}