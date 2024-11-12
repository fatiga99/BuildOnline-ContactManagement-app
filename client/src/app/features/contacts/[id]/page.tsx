import React from 'react';
import ContactForm from '@/app/features/contacts/components/contactForm';
import { useParams } from 'next/navigation';

const EditContactPage: React.FC = () => {
    const params = useParams();
    const contactId = params.id ? parseInt(params.id as string, 10) : null;

    return (
        <div>
            <h1>Edit Contact</h1>
            {contactId ? (
                <ContactForm contactId={contactId} />
            ) : (
                <p>Invalid contact ID</p>
            )}
        </div>
    );
};

export default EditContactPage;
