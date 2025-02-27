"use client";

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface ContactDetailsProps {
    contactId: number;
}

const ContactDetails: React.FC<ContactDetailsProps> = ({ contactId }) => {
    const router = useRouter();
    const contact = useSelector((state: RootState) =>
        state.contacts.contacts.find(contact => contact.id === contactId)
    );

    if (!contact) {
        return <p>Contact not found.</p>;
    }

    const handleEdit = () => {
        router.push(`/contacts/${contact.id}/edit`);
    };

    return (
        <div className="relative w-full max-w-[920px] h-auto bg-[#F8F8F8] rounded-[30px] mx-auto mt-8 md:mt-[88px] flex flex-col items-center px-4 md:px-10 py-8 md:py-12">
            <button 
                onClick={handleEdit} 
                className="absolute top-4 right-4 md:top-6 md:right-6 w-8 h-8 md:w-6 md:h-6 flex items-center justify-center text-[#111928]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.5 3.82502L20.5125 1.83752C19.3875 0.712524 17.5875 0.712524 16.4625 1.83752L5.1375 13.1625C4.7625 13.5375 4.7625 14.175 5.1375 14.5875L5.25 14.7L3.4125 16.5C3.075 16.8375 2.8875 17.2875 2.85 17.7L1.0125 19.5375C0.75 19.8 0.6375 20.175 0.675 20.5125C0.7125 20.85 0.9375 21.1875 1.275 21.3375L4.05 22.8375C4.2375 22.95 4.425 22.9875 4.6125 22.9875C4.9125 22.9875 5.25 22.875 5.475 22.6125L6.6375 21.45C7.05 21.4125 7.5 21.225 7.8 20.8875L9.6375 19.05L9.7125 19.125C9.9 19.3125 10.1625 19.425 10.425 19.425C10.6875 19.425 10.95 19.3125 11.1375 19.125L22.5 7.83752C23.025 7.31252 23.325 6.60002 23.325 5.81252C23.325 5.06252 23.0625 4.35002 22.5 3.82502ZM4.5 21.225L2.7 20.25L3.525 19.425L4.9125 20.8125L4.5 21.225ZM8.4375 17.925L6.6 19.7625C6.4875 19.875 6.3 19.875 6.1875 19.7625L4.575 18.15C4.5 18.0375 4.5 17.9625 4.5 17.925C4.5 17.8875 4.5 17.775 4.575 17.7L6.4125 15.8625L7.425 16.875L8.4375 17.925ZM21.3 6.63752L10.425 17.5125L8.625 15.7125L6.7875 13.875L17.6625 3.00002C18.1125 2.55002 18.8625 2.55002 19.3125 3.00002L21.3 4.98752C21.7875 5.47502 21.7875 6.18752 21.3 6.63752Z" fill="#111928"/>
                </svg>
            </button>

            <div className="w-[194px] h-[194px] md:w-[178px] md:h-[178px] rounded-full border-[3px] border-[#9378FF] flex items-center justify-center mt-4 md:mt-[61px]">
                <Image 
                    src={contact.profilePicture} 
                    alt={`${contact.name} profile`}
                    width={178}
                    height={178}
                    className="rounded-full object-cover w-full h-full"
                />
            </div>
            
            <h2 className="font-redhat text-[24px] md:text-[30px] font-bold leading-[39.69px] text-black mt-4 md:mt-[38px]">
                {contact.name}
            </h2>

            <div className="w-full mt-6 md:mt-10 space-y-6">
                <div>
                    <h3 className="font-redhat text-[18px] md:text-[20px] font-bold leading-[26.46px]">
                        Address
                    </h3>
                    <p className="font-public-sans text-[16px] font-normal leading-[25.6px] text-[#99879D] mt-2">
                        {contact.address}
                    </p>
                </div>
                <div>
                    <h3 className="font-redhat text-[18px] md:text-[20px] font-bold leading-[26.46px]">
                        Phone
                    </h3>
                    <p className="font-public-sans text-[16px] font-normal leading-[25.6px] text-[#99879D] mt-2">
                        {contact.phoneNumber}
                    </p>
                </div>
                <div>
                    <h3 className="font-redhat text-[18px] md:text-[20px] font-bold leading-[26.46px]">
                        Email
                    </h3>
                    <p className="font-public-sans text-[16px] font-normal leading-[25.6px] text-[#99879D] mt-2">
                        {contact.email}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ContactDetails;
