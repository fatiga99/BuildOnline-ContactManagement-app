"use client";

import React from 'react';
import ContactForm from '@/app/features/contacts/components/contactForm';

const CreateContactPage: React.FC = () => {
    return (
        <div  className="relative w-[1368px] h-[667px] bg-[#F8F8F8] rounded-[30px] mx-auto mt-[88px] flex flex-col items-center">
            <ContactForm />
        </div>
    );
};

export default CreateContactPage;
