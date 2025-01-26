import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firabaseInit";
import { doc, setDoc } from "firebase/firestore";

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

// slice
const userSlice = createSlice({
  name: "user",
  initialState: { user: null, loading: false, error: null },
  reducers: {},
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

export default userSlice.reducer;
