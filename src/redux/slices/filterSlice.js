import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    searchValue: '',
    categoryId: 0,
    currentPage: 1,
    sort: {
        name: 'популярности (DESC)',
        sortProperty: 'rating'
    }
}

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setSearchValue(state, action) {
            state.searchValue = action.payload
        },
        setCategoryId(state, action) {
            state.categoryId = action.payload
        },
        setSortType(state, action) {
            state.sort = action.payload
        },
        setPageCount(state, action) {
            state.currentPage = action.payload
        },
        setFilters(state, action) {
            state.currentPage = +action.payload.currentPage
            state.categoryId = +action.payload.categoryId
            state.sort = action.payload.sort
        },
    },
})

export const selectSort = (state) => state.filter.sort
export const selectFilter = (state) => state.filter

export const { setCategoryId, setSortType, setPageCount, setFilters, setSearchValue } = filterSlice.actions

export default filterSlice.reducer