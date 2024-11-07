export interface LoginPayload {
    token: string;
    user: { id: number; email: string };
}
