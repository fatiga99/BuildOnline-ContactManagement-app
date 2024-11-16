"use client";

import React from 'react';
import ContactForm from '@/app/features/contacts/components/contactForm';
import { useParams } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import Image from 'next/image';

const EditContactPage: React.FC = () => {
    const params = useParams();
    const contactId = params.id ? parseInt(params.id as string, 10) : null;

    const contact = useSelector((state: RootState) =>
        contactId ? state.contacts.contacts.find(c => c.id === contactId) : null
    );

    if (!contactId || !contact) {
        return <p>Invalid contact ID</p>;
    }

    return (
        <div className="relative w-[1368px] h-[667px] bg-[#F8F8F8] rounded-[30px] mx-auto mt-[88px] flex flex-col items-center">
            <div className="w-full h-[200px] flex items-center justify-start px-6 rounded-t-[30px]">
                <div className="flex items-center gap-4 ml-[36px] mt-[38px]">
                    <div className="w-[154px] h-[154px] rounded-full border-[3px] border-[#9378FF] flex items-center justify-center">
                        <div className="rounded-full overflow-hidden w-[141.3px] h-[141.3px]">
                            <Image
                                src={contact.profilePicture}
                                alt={`${contact.name}'s avatar`}
                                width={141.3}
                                height={141.3}
                                className="object-cover w-full h-full"
                            />
                        </div>
                    </div>
                    <div>
                        <h2 className="font-redhat text-[30px] font-bold leading-[39.69px] text-black ml-[60px] -mt-7">
                            {contact.name}
                        </h2>
                    </div>
                </div>
            </div>

            {contactId ? (
                <ContactForm contactId={contactId} />
            ) : (
                <p>Invalid contact ID</p>
            )}
        </div>
    );
};

export default EditContactPage;
