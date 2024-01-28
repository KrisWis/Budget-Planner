import { createSlice } from '@reduxjs/toolkit'

const cart = {
    totalPrice: 0,
    items: []
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState: cart,
    reducers: {

        addToCart: (state, action) => {
            const item_id = action.payload.id;
            const findItem = state.items.find(obj => obj.id === item_id);

            if (findItem) {

                findItem.count++;

            } else {

                state.items.push(action.payload);

            }

            state.totalPrice += action.payload.price;
        },

        removeFromCart: (state, action) => {
            state.items = state.items.filter((obj) => obj.id !== action.payload);
        },

        clearCart: (state) => {
            state.items = [];
            state.totalPrice = 0;
        },

        increaseCount: (state, action) => {
            const findItem = state.items.find(obj => obj.id === action.payload);
            findItem.count++;
            state.totalPrice += findItem.price;
        },

        decreaseCount: (state, action) => {
            const findItem = state.items.find(obj => obj.id === action.payload);
            findItem.count--;
            state.totalPrice -= findItem.price;
        }
    },
})

export const { addToCart, removeFromCart, clearCart, increaseCount, decreaseCount } = cartSlice.actions;

export default cartSlice.reducer;