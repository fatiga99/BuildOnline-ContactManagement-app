"use client";

import React from 'react';
import ContactDetails from '../components/contactDetails';
import { useParams } from 'next/navigation';

const ContactDetailsPage: React.FC = () => {
    const params = useParams();
    const contactId = params.id ? parseInt(params.id as string, 10) : null;

    if (!contactId) {
        return <p>Invalid contact ID.</p>;
    }

    return (
        <div>
            <h1>Contact Details</h1>
            <ContactDetails contactId={contactId} />
        </div>
    );
};

export default ContactDetailsPage;
