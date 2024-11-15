import React from 'react';
import { Contact } from '../interfaces/icontact';
import ContactItem from './contactItem';

interface ContactListProps {
    contacts: Contact[];
}

const ContactList: React.FC<ContactListProps> = ({ contacts }) => {
    return (
        <div className="flex flex-wrap gap-4 mt-6 gap-x-[47px] gap-y-[18px]">
            {contacts.length === 0 ? (
                <p>No contacts available.</p>
            ) : (
                contacts.map((contact) => (
                    <div 
                    className="flex-1 basis-[calc(50%-23.5px)] max-w-[calc(50%-23.5px)]"
                    key={contact.id}>
                        <ContactItem 
                            
                            contact={contact}
                        />
                    </div>
                ))
            )}
        </div>
    );
};

export default ContactList;