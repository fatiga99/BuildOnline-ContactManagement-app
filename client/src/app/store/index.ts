import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../auth/login/authSlice';
import contactsReducer from '../contacts/contactSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        contacts: contactsReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;