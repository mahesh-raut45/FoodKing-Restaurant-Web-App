import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../firabaseInit";
import { doc, setDoc } from "firebase/firestore";

// AsynThuck for register user
export const registerUser = createAsyncThunk(
  "user/register",
  async (userData, { rejectWithValue }) => {
    try {
      await createUserWithEmailAndPassword(
        auth,
        userData.email,
        userData.password
      );
      const user = auth.currentUser;

      await setDoc(doc(db, "Users", user.uid), {
        email: user.email,
        fName: userData.fName,
        lName: userData.lName,
        password: userData.password,
      });

      return {
        uid: user.uid,
        email: user.email,
        fName: userData.fName,
        lName: userData.lName,
        password: userData.password,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for user login
export const loginUser = createAsyncThunk(
  "user/login",
  async ({ logInEmail, loginPassword }, { rejectWithValue }) => {
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        logInEmail,
        loginPassword
      );
      return userCredentials.user; // return user data on success.
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// slice
const userSlice = createSlice({
  name: "user",
  initialState: { user: null, loading: false, error: null },
  reducers: {
    // logout
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    // pending
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      //success
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      //   rejected
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
