import { PayloadAction, Slice, createSlice } from '@reduxjs/toolkit'
import { FetchPizzasInterface, SortFilterInterface } from '../../@types/assets';

const initialState: FetchPizzasInterface = {
    categoryIndex: 0,
    currentPage: 1,
    sortFilter: { name: "популярности", sort: "rating" },
    searchValue: ""
}

export const filtersSlice: Slice = createSlice({
    name: 'filters',
    initialState,
    reducers: {

        setCategoryIndex: (state: FetchPizzasInterface, action: PayloadAction<number>): void => {
            state.categoryIndex = action.payload;
        },

        setSearchValue: (state: FetchPizzasInterface, action: PayloadAction<string>): void => {
            state.searchValue = action.payload;
        },

        setSortFiltering: (state: FetchPizzasInterface, action: PayloadAction<SortFilterInterface>): void => {
            state.sortFilter = action.payload;
        },

        setCurrentPage: (state: FetchPizzasInterface, action: PayloadAction<number>): void => {
            state.currentPage = action.payload;
        },

        setFilters: (state: FetchPizzasInterface, action: PayloadAction<FetchPizzasInterface>): void => {
            state.categoryIndex = action.payload.categoryIndex;
            state.searchValue = action.payload.searchValue;
            state.sortFilter = action.payload.sortFilter;
            state.currentPage = action.payload.currentPage;
        }
    },
})

export const { setCategoryIndex, setSearchValue, setSortFiltering, setCurrentPage, setFilters } = filtersSlice.actions;

export default filtersSlice.reducer;