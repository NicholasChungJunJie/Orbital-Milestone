import { configureStore } from '@reduxjs/toolkit';

// Default export from count.js
import countReducer from './account';

export const store = configureStore({
    reducer: {
        account: countReducer
    }
});
