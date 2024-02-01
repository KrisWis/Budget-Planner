import { createSlice, createAsyncThunk, Slice, AsyncThunk, ActionReducerMapBuilder } from '@reduxjs/toolkit';
import axios from 'axios';
import { PizzasInterface, PizzaInterface, FetchPizzasInterface, PizzaSlicePayloadAction } from '../../@types/assets';
import { AxiosResponse } from 'axios';

export const fetchPizzas: AsyncThunk<PizzaInterface[], any, any> = createAsyncThunk(
    'pizzas/fetchPizzasStatus',
    async ({ currentPage, categoryIndex, sortFilter, searchValue }: FetchPizzasInterface) => {

        const res: AxiosResponse = await axios.get(`https://65932afdbb12970719906e63.mockapi.io/items?page=${currentPage}&limit=4&${categoryIndex > 0 ? `category=${categoryIndex}` : ''}&sortBy=${sortFilter}&order=${sortFilter === "title" ? "asc" : "desc"}${searchValue ? `&search=${searchValue}` : ''}`);

        const data: PizzaInterface[] = res.data;

        return data;
    }
)

const initialState: PizzasInterface = {
    pizzas: [],
    status: 'loading'
}

export const pizzaSlice: Slice = createSlice({
    name: 'pizzas',
    initialState,
    reducers: {
        setPizzas: (state: PizzasInterface, action: PizzaSlicePayloadAction): void => {
            state.pizzas = action.payload;
        }
    },
    // reducers нужны просто для того, чтобы менять стейт, а extraReducers для чего то другого.
    extraReducers: (builder: ActionReducerMapBuilder<PizzasInterface>): void => {

        builder.addCase(fetchPizzas.pending, (state: PizzasInterface): void => {
            state.status = 'loading';
            state.pizzas = [];
        });

        builder.addCase(fetchPizzas.fulfilled, (state: PizzasInterface, action: PizzaSlicePayloadAction) => {
            state.pizzas = ((action.payload as unknown) as PizzaInterface[]);
            state.status = 'success';
        });

        builder.addCase(fetchPizzas.rejected, (state: PizzasInterface) => {
            state.status = 'error';
            state.pizzas = [];
        });
    },
})

export const selectPizzaById: (id: string) => void = (id: string) => (state: { pizzas: PizzasInterface }) => state.pizzas.pizzas.find(obj => obj.id === id);

export const { setPizzas } = pizzaSlice.actions;

export default pizzaSlice.reducer;