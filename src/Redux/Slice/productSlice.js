import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// fetch all products
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    // const response = await fetch("http://localhost:8080/api/food/getAll");   //doing it locally
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/api/food/getAll`
    );
    const data = await response.json();
    // console.log("Response Data: ", data);
    return data;
  }
);

// fetch single product by id
export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (id) => {
    // const response = await fetch(`http://localhost:8080/api/food/id/${id}`);
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/api/food/id/${id}`
    );
    const data = await response.json();
    console.log("Single Product: ", data);
    return data;
  }
);

const INITIALSTATE = {
  products: [],
  product: null,
  status: "idle",
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState: INITIALSTATE,
  reducers: {},
  extraReducers: (builder) => {
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
