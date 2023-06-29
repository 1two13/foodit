import { createSlice } from '@reduxjs/toolkit';
import { signInAPI, signupAPI, logoutAPI } from '../api/authApi';

const initialState = {
  user: null,
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

export const login =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      dispatch(loginStart());
      await signInAPI({ email, password });
      dispatch(loginSuccess({ email }));
    } catch (error) {
      dispatch(loginFailure(error.message));
    }
  };

export const logout = () => async (dispatch) => {
  try {
    dispatch(logoutStart());
    await logoutAPI();
    dispatch(logoutSuccess());
  } catch (error) {
    dispatch(logoutFailure(error.message));
  }
};

export default authSlice.reducer;
