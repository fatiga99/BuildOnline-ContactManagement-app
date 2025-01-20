export interface ContactUpdateDTO {
    id: number;
    name: string;
    email: string;
    phoneNumber: string;
    address: string;
    profilePicture: Uint8Array | null; 
    userId: number;
}