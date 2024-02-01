import { Store, configureStore } from '@reduxjs/toolkit';
import filter from './slices/FilterSlice';
import cart from './slices/CartSlice';
import pizzas from './slices/pizzasSlice';

export const store: Store = configureStore({
    reducer: {
        filter,
        cart,
        pizzas
    },
})

export type AppDispatch = typeof store.dispatch;