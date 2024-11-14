import React from 'react';
import { Contact } from '../interfaces/icontact';
import { useRouter } from 'next/navigation'; 
import Image from 'next/image';

interface ContactItemProps {
    contact: Contact;
}

const ContactItem: React.FC<ContactItemProps> = ({ contact }) => {
    const router = useRouter();

    const handleClick = () => {
        router.push(`/features/contacts/${contact.id}`);
    };

    return (
        <div
         onClick={handleClick} 
         className="w-[663px] h-[103px] bg-[#FBEEFF] rounded-[30px] cursor-pointer flex "
         >
            <div className="mr-4 mt-[19px] ml-[17px]">
                <Image
                    src={contact.profilePicture}
                    alt={`${contact.name}'s avatar`}
                    width={65}
                    height={65}
                    className="rounded-full"
                />
            </div>
            <div className=" ml-[16px] mt-[26px]">
                <h2 className="text-[20px] font-redhat font-bold leading-[26.46px] text-[#000000]">
                    {contact.name}
                </h2>
                <p className="text-[12.8px] font-public-sans font-normal leading-[15.04px] text-[#000000] mt-[10px]">
                    {contact.phoneNumber}
                </p>
            </div>
        </div>
    );
};

export default ContactItem;
