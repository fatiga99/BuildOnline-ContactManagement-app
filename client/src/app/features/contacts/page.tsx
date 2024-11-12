"use client";

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { RootState } from "../../store";
import { fetchContacts } from "./contactService"; 
import ContactList from "./components/contactList";
import { useSelector } from "react-redux";
import { AppDispatch } from "../../store";

const ContactsPage: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();

    const contacts = useSelector((state: RootState) => state.contacts.contacts);
    const loading = useSelector((state: RootState) => state.contacts.loading);
    const error = useSelector((state: RootState) => state.contacts.error);

    useEffect(() => { 
        dispatch(fetchContacts());
    }, [dispatch]);

    return (
        <div className="contacts-page">
            <h1>Contacts</h1>
            {loading && <p>Loading Contacts...</p>}
            {error && <p>Error loading contacts: {error}</p>}
            {contacts && <ContactList contacts={contacts} />}
        </div>
    );
};

export default ContactsPage;