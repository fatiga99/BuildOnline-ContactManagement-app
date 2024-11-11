"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";  
import { setContacts } from "../features/contacts/contactSlice";  
import ContactList from "../features/contacts/components/contactList";  

const ContactsPage: React.FC = () => {
    const dispatch = useDispatch();
    const contacts = useSelector((state: RootState) => state.contacts.items);  
    const loading = useSelector((state: RootState) => state.contacts.loading);
    const error = useSelector((state: RootState) => state.contacts.error);

    useEffect(() => {
        dispatch(setContacts());
    }, [dispatch]);

    return (
        <div className="contacts-page">
            <h1>Contactos</h1>
            {loading && <p>Cargando contactos...</p>}
            {error && <p>Error al cargar contactos: {error}</p>}
            {contacts && <ContactList contacts={contacts} />}  
        </div>
    );
};

export default ContactsPage;