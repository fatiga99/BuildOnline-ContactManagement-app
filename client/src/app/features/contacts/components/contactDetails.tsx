"use client";

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { useRouter } from 'next/navigation';

interface ContactDetailsProps {
    contactId: number;
}

const ContactDetails: React.FC<ContactDetailsProps> = ({ contactId }) => {
    const router = useRouter();
    const contact = useSelector((state: RootState) =>
        state.contacts.contacts.find(contact => contact.id === contactId)
    );

    if (!contact) {
        return <p>Contact not found.</p>;
    }

    const handleEdit = () => {
        router.push(`/features/contacts/${contact.id}/edit`);
    };

    return (
        <div className="contact-details-page">
            <div className="contact-card">
                {contact.profilePicture && (
                    <img src={contact.profilePicture} alt={`${contact.name} profile`} />
                )}
                <h2>{contact.name}</h2>
                <p><strong>Address:</strong> {contact.address}</p>
                <p><strong>Phone Number:</strong> {contact.phoneNumber}</p>
                <p><strong>Email:</strong> {contact.email}</p>
                <button onClick={handleEdit}>Edit</button>
            </div>
        </div>
    );
};

export default ContactDetails;