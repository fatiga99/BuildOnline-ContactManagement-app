"use client";

import React, { useEffect, useState } from "react";
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

    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => { 
        dispatch(fetchContacts());
    }, [dispatch]);

    const handleCreateClick = () => {
        router.push("/features/contacts/create");
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
      };
    
    const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
    );


    return (
    <div className="flex flex-col mt-[101px] max-w-screen-full w-[1368px] h-[82px] mx-auto">
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
        <div 
        className=" relative flex justify-between items-center w-full mt-9 "
        style={{
            boxShadow: `
              0px 2.77px 2.21px 0px #00000001,
              0px 6.65px 5.32px 0px #00000002,
              0px 12.52px 10.02px 0px #00000003,
              0px 22.34px 17.87px 0px #00000003,
              0px 41.78px 33.42px 0px #00000004,
              0px 100px 80px 0px #00000005
            `,
          }}>
            <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="w-full p-2 h-11 border bg-[#EFEFEF] border-[#FBEEFF] rounded-md focus:outline-none"
                />
            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                <svg
                width="18"
                height="20"
                viewBox="0 0 18 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                >
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M14.4287 14.1604C15.5372 12.6689 16.2 10.777 16.2 8.71847C16.2 3.90339 12.5735 0 8.1 0C3.62649 0 0 3.90339 0 8.71847C0 13.5336 3.62649 17.4369 8.1 17.4369C10.0125 17.4369 11.7702 16.7235 13.1559 15.5304L16.4636 19.0907C16.8151 19.469 17.3849 19.469 17.7364 19.0907C18.0879 18.7123 18.0879 18.099 17.7364 17.7207L14.4287 14.1604ZM12.6372 13.4229C13.7288 12.2036 14.4 10.5454 14.4 8.71847C14.4 4.97341 11.5794 1.93744 8.1 1.93744C4.62061 1.93744 1.8 4.97341 1.8 8.71847C1.8 12.4635 4.62061 15.4995 8.1 15.4995C9.79735 15.4995 11.3379 14.777 12.4707 13.6022C12.4944 13.569 12.5204 13.5371 12.5486 13.5067C12.5768 13.4764 12.6064 13.4484 12.6372 13.4229Z"
                    fill="#99879D"
                />
                </svg>
            </div>    
        </div>
        <div className="mt-9">
            {loading && <p>Loading Contacts...</p>}
            {error && <p>Error loading contacts: {error}</p>}
            {contacts && <ContactList contacts={filteredContacts} />}
        </div>
    </div>
    );
};

export default ContactsPage;