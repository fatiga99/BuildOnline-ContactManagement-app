import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';

const ContactDetails: React.FC = () => {
    const params = useParams();
    const router = useRouter();

    const contactId = params.id ? parseInt(params.id as string, 10) : null;

    const contact = useSelector((state: RootState) =>
        contactId ? state.contacts.contacts.find(contact => contact.id === contactId) : null
    );

    if (!contact) {
        return <p>Contact not found.</p>;
    }

    const handleEdit = () => {
        router.push(`/contacts/edit/${contact.id}`);
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
