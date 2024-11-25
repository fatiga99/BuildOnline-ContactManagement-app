"use client";

import React from "react";
import ContactForm from "@/app/features/contacts/components/contactForm";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import Image from "next/image";

const EditContactPage: React.FC = () => {
  const params = useParams();
  const contactId = params.id ? parseInt(params.id as string, 10) : null;

  const contact = useSelector((state: RootState) =>
    contactId ? state.contacts.contacts.find((c) => c.id === contactId) : null
  );

  if (!contactId || !contact) {
    return <p>Invalid contact ID</p>;
  }

  return (
    <div className="relative w-full max-w-[1200px] bg-[#F8F8F8] rounded-[30px] mx-auto mt-4 md:mt-[88px] flex flex-col items-center p-4 md:p-8 lg:p-12">
      <div className="w-full flex flex-col md:flex-row items-center justify-start gap-4 md:gap-8 rounded-t-[30px]">
        <div className="flex-shrink-0 w-[120px] h-[120px] md:w-[154px] md:h-[154px] rounded-full border-[3px] border-[#9378FF] flex items-center justify-center">
          <div className="rounded-full overflow-hidden w-[110px] h-[110px] md:w-[141.3px] md:h-[141.3px]">
            <Image
              src={contact.profilePicture}
              alt={`${contact.name}'s avatar`}
              width={141.3}
              height={141.3}
              className="object-cover w-full h-full"
            />
          </div>
        </div>
        <div className="text-center md:text-left">
          <h2 className="font-redhat text-[20px] md:text-[30px] font-bold leading-[26px] md:leading-[39.69px] text-black">
            {contact.name}
          </h2>
        </div>
      </div>

      <div className="w-full mt-6">
        {contactId ? <ContactForm contactId={contactId} /> : <p>Invalid contact ID</p>}
      </div>
    </div>
  );
};

export default EditContactPage;
