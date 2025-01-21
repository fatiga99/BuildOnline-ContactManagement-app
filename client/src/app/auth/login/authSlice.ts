import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState } from './interfaces/iauthState'
import { LoginPayload} from './interfaces/iloginPayload'

const initialState: AuthState = {
    token: null, 
    isAuthenticated: false,
    user: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action: PayloadAction<LoginPayload>) => {
            const { token, user } = action.payload;
            state.token = token;
            state.user = user;
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.token = null;
            state.user = null;
            state.isAuthenticated = false;
        },
    },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;