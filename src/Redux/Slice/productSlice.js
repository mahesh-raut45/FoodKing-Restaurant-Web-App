import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

/**
 * Async thunk to fetch all products from the backend.
 *
 * - Sends a GET request to `/api/food/getAll` to retrieve a list of all products.
 * - Parses the response data as JSON and returns it for use in the Redux store.
 * - Utilizes `createAsyncThunk` for automatic dispatching of pending, fulfilled, and rejected states.
 *
 * @returns {Promise<Object[]>} A promise that resolves to the list of products
 */
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/api/food/getAll`
    );
    const data = await response.json();
    // console.log("Response Data: ", data);
    return data;
  }
);

/**
 * Async thunk to fetch a single product by its ID from the backend.
 *
 * - Sends a GET request to `/api/food/id/:id` to retrieve the product details.
 * - Parses the response data as JSON and returns it for use in the Redux store.
 * - Logs the fetched product data for debugging purposes.
 *
 * @param {string | number} id - The ID of the product to fetch
 * @returns {Promise<Object>} A promise that resolves to the product data
 */
export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (id) => {
    // const response = await fetch(`http://localhost:8080/api/food/id/${id}`);
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/api/food/id/${id}`
    );
    const data = await response.json();
    // console.log("Single Product: ", data);
    return data;
  }
);

/**
 * Redux slice for managing product data, including fetching all products
 * and a single product by ID.
 *
 * The slice handles the following states:
 * - `products`: Array of all fetched products.
 * - `product`: A single product's data when fetched by ID.
 * - `status`: Tracks the loading state of the data fetch (idle, loading, succeeded, failed).
 * - `error`: Stores any error message that occurs during the fetch process.
 *
 * Reducers:
 * - No custom reducers are defined here; all actions are handled using `createAsyncThunk`.
 *
 * Extra Reducers (Handling async thunks):
 * - `fetchProducts`: Handles the fetching of all products from the API.
 * - `fetchProductById`: Handles the fetching of a single product by its ID.
 *
 * @type {Object} The slice object containing the initial state, reducers, and async actions.
 */

const INITIALSTATE = {
  products: [], // List of all products
  product: null, // A single product's data
  status: "idle", // Fetching status: idle, loading, succeeded, or failed
  error: null, // Error message if the fetch fails
};

const productsSlice = createSlice({
  name: "products", // Name of the slice
  initialState: INITIALSTATE, // Initial state for the products
  reducers: {}, // No local reducers defined (all handled by async thunks)
  extraReducers: (builder) => {
    // Handling fetchProducts async thunk
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    // Handling fetchProductById async thunk
    builder
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.product = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchProductById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default productsSlice.reducer;
