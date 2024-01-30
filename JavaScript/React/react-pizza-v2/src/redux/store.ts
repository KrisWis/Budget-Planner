import { configureStore } from '@reduxjs/toolkit';
import filter from './slices/FilterSlice';
import cart from './slices/CartSlice';
import pizzas from './slices/pizzasSlice';

export const store = configureStore({
    reducer: {
        filter,
        cart,
        pizzas
    },
})