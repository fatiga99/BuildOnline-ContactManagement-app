export interface ContactDTO {
    id: number;
    name: string;
    email: string;
    phoneNumber: string;
    address: string;
    profilePicture: Buffer; 
    userId: number;
}