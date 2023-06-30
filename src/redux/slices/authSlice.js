import { createSlice } from '@reduxjs/toolkit';
import { signInAPI, logoutAPI } from '../api/authApi';
import { saveUserInfo } from '../api/authApi';

const initialState = {
  user: {
    id: '',
    username: '',
    password: '',
    nickname: '',
    address: '',
  },
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess(state, action) {
      state.isLoading = false;
      state.user = action.payload;
      signInAPI(state.user);
      state.error = null;
    },
    loginFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    logoutStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    logoutSuccess: (state) => {
      state.isLoading = false;
      logoutAPI();
      state.error = null;
    },
    logoutFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    signupStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    signupSuccess(state, action) {
      state.isLoading = false;
      state.user = action.payload;
      saveUserInfo(state.user);
      state.error = null;
    },
    signupFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logoutStart,
  logoutSuccess,
  logoutFailure,
  signupStart,
  signupSuccess,
  signupFailure,
} = authSlice.actions;

export default authSlice.reducer;
