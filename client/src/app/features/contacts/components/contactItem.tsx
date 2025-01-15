import React from 'react';
import { Contact } from '../interfaces/icontact';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface ContactItemProps {
    contact: Contact;
}

const ContactItem: React.FC<ContactItemProps> = ({ contact }) => {
    const router = useRouter();
    
    const profilePictureSrc = 
        typeof contact.profilePicture === 'string' && contact.profilePicture
            ? contact.profilePicture
            : '/Imgs/default-avatar.png';

    const handleClick = () => {
        router.push(`/features/contacts/${contact.id}`);
    };

    return (
        <div
            onClick={handleClick}
            className="w-[663px] h-[103px] bg-[#FBEEFF] rounded-[30px] cursor-pointer flex hover:shadow-lg transition-shadow"
        >
            <div className="mr-4 mt-[19px] ml-[17px]">
                <Image
                    src={profilePictureSrc}
                    alt={`${contact.name || 'Default'}'s avatar`}
                    width={65}
                    height={65}
                    className="rounded-full object-cover w-[65px] h-[65px]"
                />
            </div>
            <div className="ml-[16px] mt-[26px]">
                <h2 className="text-[20px] font-redhat font-bold leading-[26.46px] text-[#000000]">
                    {contact.name}
                </h2>
                <p className="text-[12.8px] font-public-sans font-normal leading-[15.04px] text-[#000000] mt-[10px]">
                    {contact.phoneNumber}
                </p>
            </div>
            <div
                className="ml-auto mr-[26.22px] mt-[38px] bg-[#FBEEFF] rounded-full flex items-center justify-center"
                style={{ width: '24px', height: '24px' }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="3"
                    stroke="currentColor"
                    className="w-4 h-6 text-black"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
            </div>
        </div>
    );
};

export default ContactItem;
