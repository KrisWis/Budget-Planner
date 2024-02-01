import { Slice, createSlice } from '@reduxjs/toolkit'
import { CartInterface, CartItemInterface, CartSlicePayloadAction, StringPayloadAction } from '../../@types/assets';

const cart: CartInterface = {
    totalPrice: 0,
    items: []
}

export const cartSlice: Slice = createSlice({
    name: 'cart',
    initialState: cart,
    reducers: {

        addToCart: (state: CartInterface, action: CartSlicePayloadAction): void => {
            const item_id: string = action.payload.id;
            const findItem: CartItemInterface = state.items.find(obj => obj.id === item_id);

            if (findItem) {

                findItem.count++;

            } else {

                state.items.push(action.payload);

            }

            state.totalPrice += action.payload.price;
        },

        removeFromCart: (state: CartInterface, action: StringPayloadAction): void => {
            state.items = state.items.filter((obj) => obj.id !== action.payload);
        },

        clearCart: (state: CartInterface): void => {
            state.items = [];
            state.totalPrice = 0;
        },

        increaseCount: (state: CartInterface, action: StringPayloadAction): void => {
            const findItem = state.items.find(obj => obj.id === action.payload);
            findItem.count++;
            state.totalPrice += findItem.price;
        },

        decreaseCount: (state: CartInterface, action: StringPayloadAction): void => {
            const findItem = state.items.find(obj => obj.id === action.payload);
            findItem.count--;
            state.totalPrice -= findItem.price;
        }
    },
})

export const cartSelector = (state: { cart: CartInterface }): CartInterface => state.cart;

export const { addToCart, removeFromCart, clearCart, increaseCount, decreaseCount } = cartSlice.actions;

export default cartSlice.reducer;