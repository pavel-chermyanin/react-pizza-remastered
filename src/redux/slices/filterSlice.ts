import { RootState } from './../store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export enum SortEnum {
  RATING_DESC = "rating",
  RATING_ASC = "-rating",
  PRICE_DESC = "price",
  PRICE_ASC = "-price",
  TITLE_DESC = "title",
  TITLE_ASC = "-title",
}

export type Sort = {
    name: string
    sortProperty: SortEnum
}

export interface FilterSLiceState {
    searchValue: string
    categoryId: number
    currentPage: number
    sort: Sort
}

const initialState: FilterSLiceState = {
  searchValue: "",
  categoryId: 0,
  currentPage: 1,
  sort: {
    name: "популярности (DESC)",
    sortProperty: SortEnum.RATING_DESC
  },
};

const filterSlice = createSlice({
    name: 'filters', 
    initialState,
    reducers: {
        setSearchValue(state, action: PayloadAction<string> ) {
            state.searchValue = action.payload
        },
        setCategoryId(state, action: PayloadAction<number>) {
            state.categoryId = action.payload
        },
        setSortType(state, action: PayloadAction<Sort>) {
            state.sort = action.payload
        },
        setPageCount(state, action: PayloadAction<number>) {
            state.currentPage = action.payload
        },
        setFilters(state, action: PayloadAction<FilterSLiceState>) {
            state.currentPage = +action.payload.currentPage
            state.categoryId = +action.payload.categoryId
            state.sort = action.payload.sort
        },
    },
})

export const selectSort = (state: RootState) => state.filter.sort
export const selectFilter = (state: RootState) => state.filter

export const { setCategoryId, setSortType, setPageCount, setFilters, setSearchValue } = filterSlice.actions

export default filterSlice.reducer