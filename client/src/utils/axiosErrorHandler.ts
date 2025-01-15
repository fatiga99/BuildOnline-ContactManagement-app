import axios from 'axios';

export function handleAxiosError(error: unknown): string {
    if (axios.isAxiosError(error)) {
        return error.response?.data || 'An error occurred';
    }
    return 'An unknown error occurred';
}
