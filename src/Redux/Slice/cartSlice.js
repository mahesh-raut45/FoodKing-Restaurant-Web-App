import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const INITIALSTATE = {
  cartItems: [],
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: INITIALSTATE,
  reducers: {
    setCart: (state, action) => {
      state.cartItems = action.payload.cartItems;
      state.totalAmount = action.payload.totalAmount;
    },

    addToCart: (state, action) => {
      const { prod, qty } = action.payload;
      const existingItem = state.cartItems.find((i) => i.id === prod.id);

      if (existingItem) {
        //increase the quantity
        existingItem.quantity += qty;
      } else {
        // add new prod to cart
        state.cartItems.push({ ...prod, quantity: qty });
      }
      //calculate total amount
      state.totalAmount = state.cartItems.reduce(
        (total, prod) => total + prod.price * prod.quantity,
        0
      );
    },
    removeFromCart: (state, action) => {
      const id = action.payload.id;
      // remove item from cart
      state.cartItems = state.cartItems.filter((item) => item.id !== id);
      //calculate total amount
      console.log(state.cartItems);
      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.totalAmount = 0;
    },
  },
});

export const { setCart, addToCart, removeFromCart, clearCart } =
  cartSlice.actions;

export const fetchCart = (userId) => async (dispatch) => {
  try {
    const response = await axios.get(`/api/cart/${userId}`);
    dispatch(setCart(response.data));
  } catch (error) {
    console.log("Error fetching cart: ", error);
  }
};

export const addItemToCart = (userId, foodItemId) => async (dispatch) => {
  try {
    const response = await axios.post(`/api/cart/${userId}/add/${foodItemId}`);
    dispatch(setCart(response.data)); //update the cart after adding
  } catch (error) {
    console.log("Error adding item to cart: ", error);
  }
};

export default cartSlice.reducer;
