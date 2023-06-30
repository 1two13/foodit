import { createSlice } from '@reduxjs/toolkit';
import { getUserInfoAPI } from '../api/userInfoUpdateAPI';

const initialState = {
  username: '',
  password: '',
  error: '',
};

const signinSlice = createSlice({
  name: 'signip',
  initialState,
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    resetFields: (state) => {
      state.username = '';
      state.password = '';
      state.errors = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserInfoAPI.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(getUserInfoAPI.fulfilled, (state, action) => {
        state.loading = false;
        state.username = action.payload.username;
      })
      .addCase(getUserInfoAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setUsername, setPassword, setError, resetFields } = signinSlice.actions;

export default signinSlice.reducer;
