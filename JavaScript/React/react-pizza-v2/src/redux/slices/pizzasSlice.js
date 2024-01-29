import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk(
    'pizzas/fetchPizzasStatus',
    async ({ currentPage, categoryIndex, sortFilter, searchValue }, THUNKAPI) => {

        const { data } = await axios.get(`https://65932afdbb12970719906e63.mockapi.io/items?page=${currentPage}&limit=4&${categoryIndex > 0 ? `category=${categoryIndex}` : ''}&sortBy=${sortFilter}&order=${sortFilter === "title" ? "asc" : "desc"}${searchValue ? `&search=${searchValue}` : ''}`)

        return data;
    }
)

const initialState = {
    pizzas: [],
    status: 'loading'
}

export const pizzaSlice = createSlice({
    name: 'pizzas',
    initialState,
    reducers: {
        setPizzas: (state, action) => {
            state.pizzas = action.payload;
        }
    },
    // reducers нужны просто для того, чтобы менять стейт, а extraReducers для чего то другого.
    extraReducers: (builder) => {

        builder.addCase(fetchPizzas.pending, (state) => {
            state.status = 'loading';
            state.pizzas = [];
        });

        builder.addCase(fetchPizzas.fulfilled, (state, action) => {
            state.pizzas = action.payload;
            state.status = 'success';
        });

        builder.addCase(fetchPizzas.rejected, (state) => {
            state.status = 'error';
            state.pizzas = [];
        });
    },
})

export const { setPizzas } = pizzaSlice.actions;

export default pizzaSlice.reducer;