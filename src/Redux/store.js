import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Slice/userSlice";
import productReducer from "./Slice/productSlice";
import cartReducer from "./Slice/cartSlice";

export const store = configureStore({
  reducer: {
    auth: userReducer,
    products: productReducer,
    cart: cartReducer,
  },
});
