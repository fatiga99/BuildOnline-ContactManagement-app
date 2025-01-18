import { InputHTMLAttributes } from "react";

export interface BaseInputProps extends InputHTMLAttributes<HTMLInputElement> {
    variant?: 'loginForm' | 'contactForm' ; 
    className?: string; 
}