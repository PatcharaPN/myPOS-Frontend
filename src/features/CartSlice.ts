import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartState, Product } from "../types/interface";

const initialState: CartState = {
  items: [],
  loading: false,
  error: null,
  outOfStock: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addtocart: (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find(
        (item) => item.product._id === action.payload._id,
      );
      if (existingItem) {
        if (existingItem.quantity >= action.payload.stock) {
          state.outOfStock = true;
        } else {
          existingItem.quantity += 1;
          state.outOfStock = false;
        }
      } else {
        if (action.payload.stock > 0) {
          state.items.push({
            product: action.payload,
            quantity: 1,
          });
          state.outOfStock = false;
        } else {
          state.outOfStock = true;
        }
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
    deleteItem: (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find(
        (item) => item.product.name === action.payload.name,
      );
      if (existingItem) {
        existingItem.quantity -= 1;
        state.outOfStock = false;
        if (existingItem.quantity <= 0) {
          state.items = state.items.filter(
            (item) => item.product.name !== action.payload.name,
          );
        }
      }
    },
  },
});

export const { clearCart, addtocart, deleteItem } = cartSlice.actions;
export default cartSlice.reducer;
