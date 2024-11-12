import React from 'react';
import { Contact } from '../interfaces/icontact';
import { useRouter } from 'next/navigation'; 

interface ContactItemProps {
    contact: Contact;
}

const ContactItem: React.FC<ContactItemProps> = ({ contact }) => {
    const router = useRouter();

    const handleClick = () => {
        router.push(`/features/contacts/${contact.id}`);
    };

    return (
        <div className="contact-item" onClick={handleClick} style={{ cursor: 'pointer' }}>
            <div className="contact-details">
                <h2>{contact.name}</h2>
                <p>Teléfono: {contact.phoneNumber}</p>
            </div>
        </div>
    );
};

export default ContactItem;
