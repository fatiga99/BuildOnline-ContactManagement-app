"use client";

import React from 'react';
import ContactForm from '../components/contactForm';

const CreateContactPage: React.FC = () => {
    return (
        <div className="relative w-full max-w-[1368px] md:h-[667px] bg-[#F8F8F8] rounded-[30px] mx-auto mt-[88px] p-4 md:p-8 flex flex-col items-center">
            <ContactForm />
        </div>
    );
};

export default CreateContactPage;
