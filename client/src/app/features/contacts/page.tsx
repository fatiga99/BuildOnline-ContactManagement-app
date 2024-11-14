"use client";

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { RootState } from "../../store";
import { fetchContacts } from "./contactService"; 
import ContactList from "./components/contactList";
import { useSelector } from "react-redux";
import { AppDispatch } from "../../store";
import { useRouter } from 'next/navigation';

const ContactsPage: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();

    const contacts = useSelector((state: RootState) => state.contacts.contacts);
    const loading = useSelector((state: RootState) => state.contacts.loading);
    const error = useSelector((state: RootState) => state.contacts.error);
    const router = useRouter();

    useEffect(() => { 
        dispatch(fetchContacts());
    }, [dispatch]);

    const handleCreateClick = () => {
        router.push("/features/contacts/create");
    };


    return (
        <div className="flex flex-col mt-[101px] max-w-screen-xl mx-auto">
        <div className="flex justify-between items-center w-full">
            <h1 className="text-[39px] font-black leading-[51.68px] text-[#120E21] w-[174px] h-[52px] font-redhat text-left">
                Contacts
            </h1>
            <button
                onClick={handleCreateClick}
                className="w-[117px] h-[49px] bg-[#9378FF] text-white rounded-[30px] px-4 py-1 hover:bg-purple-600 font-medium text-[16px] leading-[40px] font-sans"
                >
                Create
            </button>
        </div>
        {loading && <p>Loading Contacts...</p>}
        {error && <p>Error loading contacts: {error}</p>}
        {contacts && <ContactList contacts={contacts} />}
    </div>
    );
};

export default ContactsPage;