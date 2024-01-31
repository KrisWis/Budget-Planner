import { createSlice } from '@reduxjs/toolkit'
import { FetchPizzasInterface } from '../../@types/assets';

const initialState: FetchPizzasInterface = {
    categoryIndex: 0,
    currentPage: 1,
    sortFilter: { name: "популярности", sort: "rating" },
    searchValue: ""
}

export const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {

        setCategoryIndex: (state, index) => {
            state.categoryIndex = index.payload;
        },

        setSearchValue: (state, value) => {
            state.searchValue = value.payload;
        },

        setSortFiltering: (state, filter) => {
            state.sortFilter = filter.payload;
        },

        setCurrentPage: (state, page) => {
            state.currentPage = page.payload;
        },

        setFilters: (state, action) => {
            state.categoryIndex = action.payload.categoryIndex;
            state.searchValue = action.payload.searchValue;
            state.sortFilter = action.payload.sortFilter;
            state.currentPage = action.payload.currentPage;
        }
    },
})

export const { setCategoryIndex, setSearchValue, setSortFiltering, setCurrentPage, setFilters } = filtersSlice.actions;

export default filtersSlice.reducer;