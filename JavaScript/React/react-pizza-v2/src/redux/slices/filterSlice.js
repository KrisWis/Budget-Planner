import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    categoryIndex: 0,
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
        }
    },
})

export const { setCategoryIndex, setSearchValue, setSortFiltering } = filtersSlice.actions;

export default filtersSlice.reducer;