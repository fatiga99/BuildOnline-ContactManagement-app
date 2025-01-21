"use client";

import React from "react";
import { useFormik } from "formik";
import { contactValidationSchema } from "../schemas/contactFormValidaiton";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/app/store";
import { createNewContact, editContact, removeContact } from "../contactService";
import BaseButton from "@/app/components/baseButton";
import BaseInput from "@/app/components/baseInput";

interface ContactFormProps {
  contactId?: number;
}

const ContactForm: React.FC<ContactFormProps> = ({ contactId }) => {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();

  const isEditMode = Boolean(contactId);

  const existingContact = useSelector((state: RootState) =>
    isEditMode ? state.contacts.contacts.find((contact) => contact.id === contactId) : null
  );

  const initialValues = isEditMode && existingContact
    ? {
        name: existingContact.name,
        address: existingContact.address,
        phoneNumber: existingContact.phoneNumber,
        email: existingContact.email,
        profilePicture: null as File | null, 
      }
    : {
        name: "",
        address: "",
        phoneNumber: "",
        email: "",
        profilePicture: "",
      };

  const { values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, setFieldValue } =
    useFormik({
      initialValues,
      validationSchema: contactValidationSchema,
      onSubmit: async (values, { setSubmitting }) => {
        const formData = new FormData();

        Object.entries(values).forEach(([key, value]) => {
          if (key === "profilePicture" && value instanceof File) {
            formData.append(key, value); 
          } else {
            formData.append(key, value as string);
          }
        });

        try {
          if (isEditMode) {
            await dispatch(editContact({ contactId: contactId!, formData })); 
          } 
          else {
            await dispatch(createNewContact(formData)); 
          }
          router.push("/contacts");
        } catch (error) {
          console.error(isEditMode ? "Edit failed" : "Create failed", error);
        }
        setSubmitting(false);
      },
    });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;

    if (!file) {
      alert("No file selected. Please upload an image.");
      return;
    }

    setFieldValue("profilePicture", file); 
  };

  const handleDelete = async () => {
    if (!contactId) return;
    try {
      await dispatch(removeContact(contactId));
      router.push("/contacts");
    } catch (error) {
      console.error("Error deleting contact", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 gap-4 md:grid-cols-2 w-full px-4 sm:px-8 lg:px-16 mt-4"
    >
      <div className="flex flex-col">
        <label className="text-[20px] font-redhat font-bold leading-[26.46px] text-[#000000]">
          Name
        </label>
        <BaseInput
          variant="contactForm"
          type="text"
          name="name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.name && errors.name && <div className="text-red-500 text-sm">{errors.name}</div>}
      </div>

      <div className="relative flex flex-col">
        <label className="text-[20px] font-redhat font-bold leading-[26.46px] text-[#000000]">
          Profile Picture
        </label>
        <div className="relative">
            <BaseInput
              variant="contactForm"
              type="text"
              name="profilePicture"
              value={values.profilePicture ? "Image selected" : "Upload file"}
              readOnly
              className="pr-8 w-full"
            />
            <input
              type="file"
              accept="image/*"
              id="upload-input"
              style={{ display: "none" }}
              onChange={handleImageUpload}
            />
            <label
              htmlFor="upload-input"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 17.8947H20V20H0V17.8947ZM11.1111 4.02947V15.7895H8.88889V4.02947L2.14333 10.4211L0.572222 8.93263L10 0L19.4278 8.93158L17.8567 10.42L11.1111 4.03158V4.02947Z"
                  fill="#99879D"
                />
              </svg>
            </label>
          {values.profilePicture && (
            <span className="text-green-500 text-sm mt-2">Image selected</span>
          )}
        </div>
      </div>

      <div className="flex flex-col">
        <label className="text-[20px] font-redhat font-bold leading-[26.46px] text-[#000000]">
          Address
        </label>
        <BaseInput
          variant="contactForm"
          type="text"
          name="address"
          value={values.address}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.address && errors.address && (
          <div className="text-red-500 text-sm">{errors.address}</div>
        )}
      </div>

      <div className="flex flex-col">
        <label className="text-[20px] font-redhat font-bold leading-[26.46px] text-[#000000]">
          Phone
        </label>
        <BaseInput
          variant="contactForm"
          type="text"
          name="phoneNumber"
          value={values.phoneNumber}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.phoneNumber && errors.phoneNumber && (
          <div className="text-red-500 text-sm">{errors.phoneNumber}</div>
        )}
      </div>

      <div className="col-span-1 md:col-span-2 flex flex-col">
        <label className="text-[20px] font-redhat font-bold leading-[26.46px] text-[#000000]">
          Email
        </label>
        <BaseInput
          variant="contactForm"
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.email && errors.email && (
          <div className="text-red-500 text-sm">{errors.email}</div>
        )}
      </div>

      <div className="col-span-1 md:col-span-2 flex justify-center space-x-4 mt-8">
        <BaseButton
          type="submit"
          disabled={isSubmitting}
          variant="primary"
          className="w-[263px] h-[59px] px-6 py-2"
        >
          SAVE
        </BaseButton>

        {isEditMode && (
          <BaseButton
            type="button"
            onClick={handleDelete}
            variant="delete"
            className="w-[263px] h-[59px]"
          >
            DELETE
          </BaseButton>
        )}
      </div>
    </form>
  );
};

export default ContactForm;
