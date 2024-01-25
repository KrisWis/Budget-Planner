import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/FilterSlice';

export const store = configureStore({
    reducer: {
        counter: counterReducer
    },
})