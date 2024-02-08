import { PayloadAction, Slice, createSlice } from '@reduxjs/toolkit'
import { ExpensesState } from './types';
import { Expense } from '../../../features';

const initialState: ExpensesState = {
    expenses: []
}

export const ExpensesSlice: Slice = createSlice({
    name: 'expenses',
    initialState,
    reducers: {

        addExpense: (state: ExpensesState, action: PayloadAction<Expense>): void => {
            state.expenses.push(action.payload);
        },

        removeExpense: (state: ExpensesState, action: PayloadAction<Expense>): void => {
            state.expenses.splice(state.expenses.indexOf(action.payload), 1);
        }
    },
})

export const { addExpense, removeExpense } = ExpensesSlice.actions;

export default ExpensesSlice.reducer;