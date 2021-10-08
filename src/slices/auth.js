import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const login = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://brillsconnect-backend.herokuapp.com/users/login",
        data
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateUser = createAsyncThunk("user/updateUser", async (data) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  console.log(data);

  const response = await axios.patch(
    `https://brillsconnect-backend.herokuapp.com/users/${data.id}`,
    { username: data.username, email: data.email, password: data.password },
    config
  );
  return response.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loggedIn: null,
    errorMessage: null,
  },
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      const { user, token } = action.payload;
      console.log(user);
      localStorage.setItem("token", token);
      state.user = user;
      state.loggedIn = true;
    },
    [login.rejected]: (state, action) => {
      state.errorMessage = action.payload.message;
      state.loggedIn = false;
      state.user = null;
    },
    [updateUser.fulfilled]: (state, action) => {
      const { user } = action.payload;

      state.user = user;
    },
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.loggedIn = false;
      state.errorMessage = null;
      localStorage.removeItem("token");
    },
  },
});

export const authAction = authSlice.actions;
export default authSlice.reducer;
