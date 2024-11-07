export interface AuthState {
    token: string | null;
    isAuthenticated: boolean;
    user: { id: number; email: string } | null;
}