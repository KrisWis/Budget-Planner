import { Slice, createSlice } from '@reduxjs/toolkit'
import { NumberPayloadAction, FetchPizzasInterface, FiltersPayloadAction, StringPayloadAction, SortFilterPayloadAction } from '../../@types/assets';

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

        setCategoryIndex: (state: FetchPizzasInterface, action: NumberPayloadAction): void => {
            state.categoryIndex = action.payload;
        },

        setSearchValue: (state: FetchPizzasInterface, action: StringPayloadAction): void => {
            state.searchValue = action.payload;
        },

        setSortFiltering: (state: FetchPizzasInterface, action: SortFilterPayloadAction): void => {
            state.sortFilter = action.payload;
        },

        setCurrentPage: (state: FetchPizzasInterface, action: NumberPayloadAction): void => {
            state.currentPage = action.payload;
        },

        setFilters: (state: FetchPizzasInterface, action: FiltersPayloadAction): void => {
            state.categoryIndex = action.payload.categoryIndex;
            state.searchValue = action.payload.searchValue;
            state.sortFilter = action.payload.sortFilter;
            state.currentPage = action.payload.currentPage;
        }
    },
})

export const { setCategoryIndex, setSearchValue, setSortFiltering, setCurrentPage, setFilters } = filtersSlice.actions;

export default filtersSlice.reducer;