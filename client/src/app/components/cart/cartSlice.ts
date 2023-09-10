import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CartItem, CartState } from "./cart.type";
import {
  addToCart,
  deleteItemFromCart,
  fetchItemsByUserId,
  updateCart,
} from "./cartAPI";

const initialState: CartState = {
  status: "idle",
  items: [],
  value: 0,
};

export const addToCartAsync = createAsyncThunk(
  "cart/addToCart",
  async (item: CartItem) => {
    const response = await addToCart(item);
    return response.data;
  },
);

export const fetchItemsByUserIdAsync = createAsyncThunk(
  "cart/fetchItemsByUserId",
  async (userId: any) => {
    const response = await fetchItemsByUserId(userId);
    return response.data;
  },
);

export const updateCartAsync = createAsyncThunk(
  "cart/updateCart",
  async (update: CartItem) => {
    const response = await updateCart(update);
    return response.data;
  },
);

export const deleteItemFromCartAsync = createAsyncThunk(
  "cart/deleteItemFromCart",
  async (itemId: any) => {
    const response = await deleteItemFromCart(itemId);
    return response.data;
  },
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items.push(action.payload);
      })
      .addCase(fetchItemsByUserIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchItemsByUserIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items = action.payload;
      })
      .addCase(updateCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id,
        );
        state.items[index] = action.payload;
      })
      .addCase(deleteItemFromCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteItemFromCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id,
        );
        state.items.splice(index, 1);
      });
  },
});

export const { increment } = cartSlice.actions;

export const selectItems = (state: { cart: CartState }) => state.cart.items;

export default cartSlice.reducer;
