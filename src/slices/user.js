import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUser = createAsyncThunk("user/fetchUser", async (id) => {
  const response = await axios.get(`http://localhost:8000/users/${id}`);
  return response.data;
});

export const updateUser = createAsyncThunk("user/updateUser", async (data) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.patch(
    `http://http://localhost:8000/users/${data.id}`,
    { ...data.data },
    config
  );
  return response.data;
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    user: null,
  },
  extraReducers: {
    [fetchUser.fulfilled]: (state, action) => {
      const { user } = action.payload;

      state.user = user;
    },
    [updateUser.fulfilled]: (state, action) => {
      const { user } = action.payload;

      state.user = user;
    },
  },
});

export const userAction = userSlice.actions;
export default userSlice.reducer;
