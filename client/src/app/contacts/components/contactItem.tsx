import React from 'react';
import { Contact } from '../interfaces/icontact';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import ContactArrowSvg from '@/app/components/contactArrowSvg';

interface ContactItemProps {
    contact: Contact;
}

const ContactItem: React.FC<ContactItemProps> = ({ contact }) => {
    const router = useRouter();
    
    const profilePictureSrc = 
        contact.profilePicture && typeof contact.profilePicture === 'string'
            ? contact.profilePicture
            : '/Imgs/default-avatar.png';



    const handleClick = () => {
        router.push(`/contacts/${contact.id}`);
    };

    return (
        <div
            onClick={handleClick}
            className="max-w-2xl w-full  h-[103px] bg-[#FBEEFF] rounded-[30px] cursor-pointer flex hover:shadow-lg transition-shadow"
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
                <ContactArrowSvg className="w-4 h-6 text-black" />
            </div>
        </div>
    );
};

export default ContactItem;
