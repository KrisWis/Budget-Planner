import { Store, configureStore } from '@reduxjs/toolkit';
import filter from './slices/FilterSlice';
import cart from '../redux/slices/cart/slice'
import pizzas from './slices/pizzasSlice';
import { useDispatch } from 'react-redux';

export const store: Store = configureStore({
    reducer: {
        filter,
        cart,
        pizzas
    },
})

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch | any>();