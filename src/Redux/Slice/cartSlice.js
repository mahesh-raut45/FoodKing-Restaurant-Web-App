import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// const API_URL = "http://localhost:8080/api/cart/";

const INITIALSTATE = {
  cartItems: [],
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: INITIALSTATE,
  reducers: {
    // it sets the cart item and total amount coming from backend
    setCart: (state, action) => {
      state.cartItems = action.payload.items;
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

// fetch cart items by user id
export const fetchCart = (userId) => async (dispatch) => {
  try {
    // const response = await axios.get(API_URL + `${userId}`);
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/cart/${userId}`
    );
    dispatch(setCart(response.data));
  } catch (error) {
    console.log("Error fetching cart: ", error);
  }
};

// add item to cart
export const addItemToCart = (userId, foodItemId, qty) => async (dispatch) => {
  try {
    // const response = await axios.post(
    //   API_URL + `${userId}/add/${foodItemId}/${qty}`
    // );
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/api/cart/${userId}/add/${foodItemId}/${qty}`
    );
    dispatch(setCart(response.data)); //update the cart after adding
  } catch (error) {
    console.log("Error adding item to cart: ", error);
  }
};

// delete item from cart

export const deleteCartItem = (userId, itemId) => async (dispatch) => {
  try {
    // await axios.delete(API_URL + `user/${userId}/item/${itemId}`);
    await axios.delete(
      `${process.env.REACT_APP_BASE_URL}/api/cart//user/${userId}/item/${itemId}`
    );
    dispatch(fetchCart(userId)); // fetch the updated cart items
  } catch (error) {
    console.log("Error deleting item", error);
  }
};

export default cartSlice.reducer;
