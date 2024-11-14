export interface ContactWithBase64DTO {
    id: number;
    name: string;
    email: string;
    phoneNumber: string;
    address: string;
    profilePicture: string | null;
    userId: number;
}