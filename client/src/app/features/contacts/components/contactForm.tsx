"use client";

import React from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/app/store';
import { createNewContact, editContact, removeContact } from '../contactService';

interface ContactFormProps {
    contactId?: number; 
}

const ContactForm: React.FC<ContactFormProps> = ({ contactId }) => {
    const router = useRouter();
    const dispatch: AppDispatch = useDispatch();

    const isEditMode = Boolean(contactId);

   
    const existingContact = useSelector((state: RootState) =>
        isEditMode ? state.contacts.contacts.find(contact => contact.id === contactId) : null
    );

    const initialValues = isEditMode && existingContact ? {
        name: existingContact.name,
        address: existingContact.address,
        phoneNumber: existingContact.phoneNumber,
        email: existingContact.email,
        profilePicture: existingContact.profilePicture || "",
    } : {
        name: '',
        address: '',
        phoneNumber: '',
        email: '',
        profilePicture: '',
    };

    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required'),
        address: Yup.string().required('Address is required'),
        phoneNumber: Yup.string().required('Phone number is required'),
        email: Yup.string().email('Invalid email format').required('Email is required'),
        profilePicture: Yup.string().required('Profile picture is required'),
    });

    const { values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, setFieldValue } = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values, { setSubmitting }) => {
            try {
                if (isEditMode) {
                    await dispatch(editContact({ contactId: contactId!, contactData: values }));
                } 
                else {
                    await dispatch(createNewContact(values));
                }
                router.push('/features/contacts');
            } 
            catch (error) {
                console.error(isEditMode ? 'Edit failed' : 'Create failed', error);
            }
            setSubmitting(false);
        },
    });

    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
    
        if (!file) {
            alert('No file selected. Please upload an image.');
            return;
        }
    
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'Buildonline'); 
    
        try {
            const response = await fetch('https://api.cloudinary.com/v1_1/dk9mq6vix/image/upload', {
                method: 'POST',
                body: formData,
            });
    
            if (!response.ok) {
                throw new Error('Failed to upload image');
            }
    
            const data = await response.json();
    
            if (data.secure_url) {
                setFieldValue('profilePicture', data.secure_url); 
            } else {
                throw new Error('No URL returned from Cloudinary');
            }
        } catch (error) {
            console.error('Error Uploading Image to Cloudinary', error);
            alert(isEditMode ? 'Edit failed' : 'Create failed');
        }
    };

    const handleDelete = async () => {
        if (!contactId) return; 
        try {
            await dispatch(removeContact(contactId));
            router.push('/features/contacts'); 
        } catch (error) {
            console.error('Error deleting contact', error);
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
            <input
              type="text"
              name="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className="p-2 border rounded-[8px] bg-[#FBEEFF] h-[56px] focus:outline-none text-[16px] backdrop-blur-[40px] text-[#99879D] leading-[18.8px] font-public-sans"
            />
            {touched.name && errors.name && <div className="text-red-500 text-sm">{errors.name}</div>}
          </div>
      
          <div className="relative flex flex-col">
            <label className="text-[20px] font-redhat font-bold leading-[26.46px] text-[#000000]">
              Profile Picture
            </label>
            <div className="relative">
              <input
                type="text"
                name="profilePicture"
                value={values.profilePicture ? "Image selected" : "Upload file"}
                readOnly
                className="p-2 pr-8 border rounded-[8px] bg-[#FBEEFF] h-[56px] focus:outline-none text-[16px] backdrop-blur-[40px] text-[#99879D] leading-[18.8px] font-public-sans w-full"
              />
              <input
                type="file"
                accept="image/*"
                id="upload-input"
                style={{ display: 'none' }}
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
            </div>
          </div>
      
          <div className="flex flex-col">
            <label className="text-[20px] font-redhat font-bold leading-[26.46px] text-[#000000]">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={values.address}
              onChange={handleChange}
              onBlur={handleBlur}
              className="p-2 border rounded-[8px] bg-[#FBEEFF] h-[56px] focus:outline-none text-[16px] backdrop-blur-[40px] text-[#99879D] leading-[18.8px] font-public-sans"
            />
            {touched.address && errors.address && (
              <div className="text-red-500 text-sm">{errors.address}</div>
            )}
          </div>
      
          <div className="flex flex-col">
            <label className="text-[20px] font-redhat font-bold leading-[26.46px] text-[#000000]">
              Phone
            </label>
            <input
              type="text"
              name="phoneNumber"
              value={values.phoneNumber}
              onChange={handleChange}
              onBlur={handleBlur}
              className="p-2 border rounded-[8px] bg-[#FBEEFF] h-[56px] focus:outline-none text-[16px] backdrop-blur-[40px] text-[#99879D] leading-[18.8px] font-public-sans"
            />
            {touched.phoneNumber && errors.phoneNumber && (
              <div className="text-red-500 text-sm">{errors.phoneNumber}</div>
            )}
          </div>
      
          <div className="col-span-1 md:col-span-2 flex flex-col">
            <label className="text-[20px] font-redhat font-bold leading-[26.46px] text-[#000000]">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className="p-2 border rounded-[8px] bg-[#FBEEFF] h-[56px] focus:outline-none text-[16px] backdrop-blur-[40px] text-[#99879D] leading-[18.8px] font-public-sans"
            />
            {touched.email && errors.email && (
              <div className="text-red-500 text-sm">{errors.email}</div>
            )}
          </div>
      
          <div className="col-span-1 md:col-span-2 flex justify-center space-x-4 mt-8">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-[263px] h-[59px] bg-[#9378FF] px-6 py-2 rounded-full hover:bg-purple-600 transition-colors text-white"
            >
              SAVE
            </button>
      
            {isEditMode && (
              <button
                type="button"
                onClick={handleDelete}
                className="w-[263px] h-[59px] bg-[#FF7878] px-6 py-2 rounded-full hover:bg-red-600 transition-colors text-white"
              >
                DELETE
              </button>
            )}
          </div>
        </form>
      );
      
};

export default ContactForm;
