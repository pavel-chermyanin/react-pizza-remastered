import { PizzaBlockProps } from "./../../components/PizzaBlock/index";
import { RootState } from "./../store";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export type SearchPizzaParams = {
  category: string;
  sortType: string;
  order: string;
  search: string;
  currentPage: string;
};

export const fetchPizzas = createAsyncThunk<PizzaBlockProps[], SearchPizzaParams>(
  "pizza/fetchPizzasStatus",
  async (params) => {
    const { category, sortType, order, search, currentPage } = params;
    const { data } = await axios.get<PizzaBlockProps[]>(
      `https://628e5bff368687f3e715b43f.mockapi.io/pizzas?page=${currentPage}&limit=4${category}&sortBy=${sortType}&order=${order}${search}`
    );
    return data;
  }
);
enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

interface PizzaSliceState {
  items: PizzaBlockProps[];
  status: Status;
}

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING,
};

const pizzasSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state, action) => {
        state.status = Status.LOADING;
        state.items = [];
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.status = Status.SUCCESS;
        state.items = action.payload;
      })
      .addCase(fetchPizzas.rejected, (state, action) => {
        state.status = Status.ERROR;
        state.items = [];
      });
  },
  // extraReducers: {
  //     [fetchPizzas.pending]: (state, action) => {
  //         state.status = 'loading'
  //         state.items = []
  //     },
  //     [fetchPizzas.fulfilled]: (state, action) => {
  //         state.items = action.payload
  //         state.status = 'success'
  //     },
  //     [fetchPizzas.rejected]: (state, action) => {
  //         state.status = 'error'
  //         state.items = []
  //     }
  // },
});

export const selectPizza = (state: RootState) => state.pizzas;

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
