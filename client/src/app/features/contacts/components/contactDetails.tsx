import React from 'react';
import { useParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { AppDispatch } from '@/app/store';
import { editContact } from '../contactService';

const ContactDetails: React.FC = () => {
    const params = useParams();
    const contactId = params.id;
    const dispatch: AppDispatch = useDispatch();

    const contact = useSelector((state: RootState) =>
        state.contacts.contacts.find(contact => contact.id === parseInt(contactId!))
    );

    if (!contact) {
        return <p>Contact not found.</p>;
    }

    const handleEdit = () => {
        dispatch(editContact({ contactId: contact.id, contactData: contact }));
    };

    return (
        <div className="contact-details-page">
            <div className="contact-card">
                <img src={contact.profilePicture} alt={`${contact.name} profile`} />
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
