import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { login, register } from "../../Feature/auth/AuthService";

/**
 * Redux slice for handling user authentication state.
 *
 * State properties:
 * - `user`: Contains the logged-in user data (or null if not logged in).
 * - `isAuthenticated`: Boolean indicating whether the user is authenticated.
 * - `isLoading`: Boolean indicating if a registration or login request is in progress.
 * - `isError`: Boolean indicating if an error occurred during registration or login.
 * - `isSuccess`: Boolean indicating if a registration or login was successful.
 * - `message`: Stores any success or error message related to authentication.
 */
const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

/* Thunk:`registerUser`: Handles user registration. */
export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
      return await register(userData);
    } catch (error) {
      console.error("Error in registration:", error);

      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

/* Thunk: `registerUser`: Handles user registration. */
export const loginUser = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      return await login(userData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Thunk:`logout`: Logs the user out and clears user data.
export const logout = createAsyncThunk("auth/logout", async () => {
  logout();
});

// // Thunk:`getUserById`: Get user by id
// export const getUserById = createAsyncThunk(
//   "auth/getUser",
//   async (userId, thunkAPI) => {
//     try {
//       return await getUser(userId);
//     } catch (error) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();
//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );

// slice
const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    //- `reset`: Resets the loading, success, error, and message states.
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    //- Handles the different states of async thunks (`pending`, `fulfilled`, `rejected`) for registration, login, and logout.
    builder
      // Register user
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        state.message = action.payload.message;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      // Login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

// export const { logout } = userSlice.actions;
export const { reset } = userSlice.actions;
export default userSlice.reducer;
