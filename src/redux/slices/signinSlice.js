import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: '',
  password: '',
  error: '',
};

const signinSlice = createSlice({
  name: 'signip',
  initialState,
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setError: (state, action) => {
      state.errors = action.payload;
    },
    resetFields: (state, action) => {
      state.email = '';
      state.password = '';
      state.errors = '';
    },
  },
});

export const { setEmail, setPassword, setError, resetFields } = signinSlice.actions;

export default signinSlice.reducer;
