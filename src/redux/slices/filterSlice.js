import { createSlice } from '@reduxjs/toolkit'

const initialState = {
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

export const { setCategoryId, setSortType, setPageCount, setFilters } = filterSlice.actions

export default filterSlice.reducer