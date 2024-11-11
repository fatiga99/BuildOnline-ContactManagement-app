"use client";

import React from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter, useParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/app/store';
import { createNewContact, editContact } from '../contactService';

interface ContactFormProps {
    isEditMode?: boolean;
}

const ContactForm: React.FC<ContactFormProps> = ({ isEditMode = false }) => {
    const router = useRouter();
    const dispatch: AppDispatch = useDispatch();
    const params = useParams();
    const contactId = params.id;

    const existingContact = useSelector((state: RootState) =>
        state.contacts.contacts.find(contact => contact.id === parseInt(contactId!))
    );

    const initialValues = isEditMode && existingContact ? {
        name: existingContact.name,
        address: existingContact.address,
        phoneNumber: existingContact.phoneNumber,
        email: existingContact.email,
    } : {
        name: '',
        address: '',
        phoneNumber: '',
        email: '',
    };

    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required'),
        address: Yup.string().required('Address is required'),
        phoneNumber: Yup.string().required('Phone number is required'),
        email: Yup.string().email('Invalid email format').required('Email is required'),
    });

    const { values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting } = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values, { setSubmitting }) => {
            try {
                if (isEditMode) {
                    await dispatch(editContact({ contactId: parseInt(contactId!), contactData: values }));
                } else {
                    await dispatch(createNewContact(values));
                }
                router.push('/contacts');
            } catch (error) {
                console.error(isEditMode ? 'Edit failed' : 'Create failed', error);
            }
            setSubmitting(false);
        },
    });

    return (
        <form onSubmit={handleSubmit} className="contact-form">
            <label>Name</label>
            <input
                type="text"
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
            />
            {touched.name && errors.name && <div>{errors.name}</div>}


            <label>Address</label>
            <input
                type="text"
                name="address"
                value={values.address}
                onChange={handleChange}
                onBlur={handleBlur}
            />
            {touched.address && errors.address && <div>{errors.address}</div>}

            <label>Phone Number</label>
            <input
                type="text"
                name="phoneNumber"
                value={values.phoneNumber}
                onChange={handleChange}
                onBlur={handleBlur}
            />
            {touched.phoneNumber && errors.phoneNumber && <div>{errors.phoneNumber}</div>}

            <label>Email</label>
            <input
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
            />
            {touched.email && errors.email && <div>{errors.email}</div>}

            <button type="submit" disabled={isSubmitting}>
                {isEditMode ? 'Update Contact' : 'Create Contact'}
            </button>
        </form>
    );
};

export default ContactForm;