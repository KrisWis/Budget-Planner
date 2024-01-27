import { createSlice } from '@reduxjs/toolkit'

const initialState = {
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
        }
    },
})

export const { setCategoryIndex, setSearchValue, setSortFiltering, setCurrentPage } = filtersSlice.actions;

export default filtersSlice.reducer;