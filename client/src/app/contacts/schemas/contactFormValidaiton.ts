import * as Yup from 'yup';
  
export const contactValidationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    address: Yup.string().required('Address is required'),
    phoneNumber: Yup.string().required('Phone number is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    profilePicture: Yup.string().required('Profile picture is required'),
});
