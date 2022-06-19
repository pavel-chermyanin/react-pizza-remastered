import { RootState } from './../store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const calcSum = (items: CartItem[]) => {
    return items.reduce((sum, item) => sum + item.price * item.count, 0)
};

export type CartItem = {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  type: string;
  size: number;
  count: number;
};

interface CartSliceState {
    totalPrice: number
    items: CartItem[]
}

const initialState: CartSliceState = {
    totalPrice: 0,
    items: []
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action: PayloadAction<CartItem>) {
            const findItem = state.items.find(obj => obj.id === action.payload.id)

            if (findItem) {
                findItem.count++
            } else {
                state.items.push({ ...action.payload, count: 1 })
            }

            state.totalPrice = calcSum(state.items);
        },
        minusItem(state,action: PayloadAction<string>) {
            const findItem = state.items.find((obj: CartItem) => obj.id === action.payload);

            if (findItem && findItem.count > 1) {
                findItem.count--
            }

            state.totalPrice = calcSum(state.items);
        },
        removeItem(state, action: PayloadAction<string>) {
            state.items = state.items.filter(obj => obj.id !== action.payload)

            state.totalPrice = calcSum(state.items);
        },
        clearItems(state) {
            state.items = []
            state.totalPrice = 0
        },

    },
})

export const selectCart = (state: RootState) => state.cart
export const selectItemById = (id: string) => (state: RootState) => state.cart.items.find(obj => obj.id === id)

export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions

export default cartSlice.reducer