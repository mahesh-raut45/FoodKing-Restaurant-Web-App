import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// const API_URL = "http://localhost:8080/api/cart/";

const INITIALSTATE = {
  cartItems: [],
  totalAmount: 0,
};

/**
 * Redux slice for managing the shopping cart state.
 *
 * Handles cart item addition, removal, update, and reset operations,
 * while maintaining the total cart amount.
 */
const cartSlice = createSlice({
  name: "cart",
  initialState: INITIALSTATE,
  reducers: {
    /**
     * Sets the entire cart state from backend response.
     *
     * @param {Object} state - Current cart state
     * @param {Object} action - Action with payload containing cart items and total amount
     * @param {Array} action.payload.items - Array of cart items from backend
     * @param {number} action.payload.totalAmount - Total cost of cart items
     */
    setCart: (state, action) => {
      state.cartItems = action.payload.items;
      state.totalAmount = action.payload.totalAmount;
    },

    /**
     * Adds a product to the cart or updates its quantity if it already exists.
     * Also recalculates the total cart amount.
     *
     * @param {Object} action.payload.prod - Product object to add
     * @param {number} action.payload.qty - Quantity to add
     */
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

    /**
     * Removes an item from the cart by ID and updates the total amount.
     *
     * @param {Object} action.payload.id - ID of the product to remove
     */
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

    /**
     * Clears the cart, resetting items and total amount to initial values.
     */
    clearCart: (state) => {
      state.cartItems = [];
      state.totalAmount = 0;
    },
  },
});

/**
 * Async thunk to fetch cart items for a specific user from the backend.
 *
 * - Sends a GET request to the `/api/cart/:userId` endpoint.
 * - Dispatches `setCart` to update the Redux store with cart data.
 * - Handles and logs errors if the request fails.
 *
 * @param {string | number} userId - The ID of the user whose cart is to be fetched
 * @returns {Function} A thunk function that performs the async operation
 */
export const fetchCart = (userId) => async (dispatch) => {
  if (userId) {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/cart/${userId}`
      );
      dispatch(setCart(response.data));
    } catch (error) {
      console.log("Error fetching cart: ", error);
    }
  }
};

/**
 * Async thunk to add a food item to a user's cart.
 *
 * - Sends a POST request to `/api/cart/:userId/add/:foodItemId/:qty` to add the specified item and quantity.
 * - On success, dispatches `setCart` with the updated cart data from the backend.
 * - Catches and logs any errors that occur during the API call.
 *
 * @param {string | number} userId - The ID of the user
 * @param {string | number} foodItemId - The ID of the food item to be added
 * @param {number} qty - The quantity of the item to add
 * @returns {Function} A thunk function that performs the async operation
 */
export const addItemToCart = (userId, foodItemId, qty) => async (dispatch) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/api/cart/${userId}/add/${foodItemId}/${qty}`
    );
    dispatch(setCart(response.data)); //update the cart after adding
  } catch (error) {
    console.log("Error adding item to cart: ", error);
  }
};

/**
 * Async thunk to delete a specific item from a user's cart.
 *
 * - Sends a DELETE request to `/api/cart/user/:userId/item/:itemId` to remove the item.
 * - On successful deletion, re-fetches the updated cart using `fetchCart`.
 * - Logs an error message if the operation fails.
 *
 * @param {string | number} userId - The ID of the user whose cart is being modified
 * @param {string | number} itemId - The ID of the item to delete from the cart
 * @returns {Function} A thunk function that performs the async operation
 */
export const deleteCartItem = (userId, itemId) => async (dispatch) => {
  try {
    await axios.delete(
      `${process.env.REACT_APP_BASE_URL}/api/cart/user/${userId}/item/${itemId}`
    );
    dispatch(fetchCart(userId)); // fetch the updated cart items
  } catch (error) {
    console.log("Error deleting item", error);
  }
};

export const { setCart, addToCart, removeFromCart, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
