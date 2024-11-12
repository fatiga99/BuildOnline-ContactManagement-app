"use client";

import React from 'react';
import ContactForm from '@/app/features/contacts/components/contactForm';

const CreateContactPage: React.FC = () => {
    return (
        <div>
            <h1>Create New Contact</h1>
            <ContactForm />
        </div>
    );
};

export default CreateContactPage;
