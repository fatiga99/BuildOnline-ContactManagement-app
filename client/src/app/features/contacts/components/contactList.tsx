import React from 'react';
import { Contact } from '../interfaces/icontact';
import ContactItem from './contactItem';

interface ContactListProps {
    contacts: Contact[];
}

const ContactList: React.FC<ContactListProps> = ({ contacts }) => {
    return (
        <div className="contact-list">
            {contacts.length === 0 ? (
                <p>No contacts available.</p>
            ) : (
                contacts.map((contact) => (
                    <ContactItem 
                        key={contact.id}
                        contact={contact}
                    />
                ))
            )}
        </div>
    );
};

export default ContactList;