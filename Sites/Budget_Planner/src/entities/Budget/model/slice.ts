import { PayloadAction, Slice, createSlice } from '@reduxjs/toolkit';
import { BudgetState } from './types';

const initialState: BudgetState = {
    budget: 0,
    remaining: 0,
    spentSoFar: 0
}

export const BudgetSlice: Slice = createSlice({
    name: 'budget',
    initialState,
    reducers: {

        getData: (state: BudgetState): BudgetState => {
            return state;
        },

        setBudget: (state: BudgetState, action: PayloadAction<number>): void => {
            state.budget = action.payload;
            state.remaining = state.budget - state.spentSoFar;
        },

        setSpentSoFar: (state: BudgetState, action: PayloadAction<number>): void => {
            state.spentSoFar = action.payload;
            state.remaining = state.budget - state.spentSoFar;
        }
    },
})

export const { getData, setBudget, setSpentSoFar } = BudgetSlice.actions;

export default BudgetSlice.reducer;