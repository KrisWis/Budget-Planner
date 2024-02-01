import { createSlice, createAsyncThunk, Slice, AsyncThunk, ActionReducerMapBuilder } from '@reduxjs/toolkit';
import axios from 'axios';
import { PizzasInterface, PizzaInterface, FetchPizzasInterface } from '../../@types/assets';
import { AxiosResponse } from 'axios';
import { RootState } from '../store';
import { PayloadAction } from '@reduxjs/toolkit';


export const fetchPizzas: AsyncThunk<PizzaInterface[], FetchPizzasInterface, any> = createAsyncThunk(
    'pizzas/fetchPizzasStatus',
    async ({ currentPage, categoryIndex, sortFilter, searchValue }: FetchPizzasInterface) => {

        const { data }: AxiosResponse<PizzaInterface[]> = await axios.get(`https://65932afdbb12970719906e63.mockapi.io/items?page=${currentPage}&limit=4&${categoryIndex > 0 ? `category=${categoryIndex}` : ''}&sortBy=${sortFilter}&order=${sortFilter === "title" ? "asc" : "desc"}${searchValue ? `&search=${searchValue}` : ''}`);

        return data;
    }
)

enum Status {
    LOADING = 'loading',
    COMPLETED = 'completed',
    ERROR = 'error'
}

const initialState: PizzasInterface = {
    pizzas: [],
    status: Status.LOADING
}

export const pizzaSlice: Slice = createSlice({
    name: 'pizzas',
    initialState,
    reducers: {
        setPizzas: (state: PizzasInterface, action: PayloadAction<PizzaInterface[]>): void => {
            state.pizzas = action.payload;
        }
    },
    // reducers нужны просто для того, чтобы менять стейт, а extraReducers для чего то другого.
    extraReducers: (builder: ActionReducerMapBuilder<PizzasInterface>): void => {

        builder.addCase(fetchPizzas.pending, (state: PizzasInterface): void => {
            state.status = Status.LOADING;
            state.pizzas = [];
        });

        builder.addCase(fetchPizzas.fulfilled, (state: PizzasInterface, action: PayloadAction<PizzaInterface[]>) => {
            state.pizzas = ((action.payload as unknown) as PizzaInterface[]);
            state.status = Status.COMPLETED;
        });

        builder.addCase(fetchPizzas.rejected, (state: PizzasInterface) => {
            state.status = Status.ERROR;
            state.pizzas = [];
        });
    },
})

export const selectPizzaById: (id: string) => void = (id: string) => (state: RootState) => state.pizzas.pizzas.find(obj => obj.id === id);

export const { setPizzas } = pizzaSlice.actions;

export default pizzaSlice.reducer;