import React, { SVGAttributes } from "react";

interface IconProps extends SVGAttributes<SVGSVGElement> {
    className?: string; 
}

const ContactArrowSvg: React.FC<IconProps> = ({ className, ...props }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="3"
            stroke="currentColor"
            className={className}
            {...props} 
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
        </svg>
    );
};

export default ContactArrowSvg;
