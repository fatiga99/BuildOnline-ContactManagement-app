import React from 'react';
import { Contact } from '../interfaces/icontact';
import ContactItem from './contactItem';

interface ContactListProps {
    contacts: Contact[];
}

const ContactList: React.FC<ContactListProps> = ({ contacts }) => {
    return (
        <div className="flex flex-wrap gap-4 mt-6 w-full">
            {contacts.length === 0 ? (
                <p>No contacts available.</p>
            ) : (
                contacts.map((contact) => (
                    <div
                        className="basis-full sm:basis-[calc(50%-20px)] sm:max-w-[calc(50%-20px)] max-w-full"
                        key={contact.id}
                    >
                        <ContactItem contact={contact} />
                    </div>
                ))
            )}
        </div>
    );
};

export default ContactList;