import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'


export const fetchPizzas = createAsyncThunk(
    'pizza/fetchPizzasStatus',
    async (params) => {
        const { category, sortType, order, search, currentPage } = params
        const { data } = await axios
            .get(`https://628e5bff368687f3e715b43f.mockapi.io/pizzas?page=${currentPage}&limit=4${category}&sortBy=${sortType}&order=${order}${search}`)
        return data
    }
)

const initialState = {
    items: [],
    status: 'loading'
}

const pizzasSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, action) {
            state.items = action.payload
        },
    },
    extraReducers: {
        [fetchPizzas.pending]: (state, action) => {
            state.status = 'loading'
            state.items = []
        },
        [fetchPizzas.fulfilled]: (state, action) => {
            state.items = action.payload
            state.status = 'success'
        },
        [fetchPizzas.rejected]: (state, action) => {
            state.status = 'error'
            state.items = []
        }
    },
})

export const { setItems } = pizzasSlice.actions

export default pizzasSlice.reducer