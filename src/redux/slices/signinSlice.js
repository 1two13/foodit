import { createSlice } from '@reduxjs/toolkit';

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
    resetFields: (state, action) => {
      state.username = '';
      state.password = '';
      state.errors = '';
    },
  },
});

export const { setUsername, setPassword, setError, resetFields } = signinSlice.actions;

export default signinSlice.reducer;
