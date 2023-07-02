import { createSlice } from '@reduxjs/toolkit';
import { saveUserInfo } from '../api/authApi';
import { getUserInfoAPI } from '../api/userInfoUpdateAPI';

const initialState = {
  user: {
    token: localStorage.getItem('token') ?? '',
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
    setNickname(state, action) {
      state.user = { ...state.user, nickname: action.payload };
    },
    loginStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess(state, action) {
      state.isLoading = false;
      state.user = { ...state.user, ...action.payload };
      state.error = null;
    },
    loginFailure(state, action) {
      state.user = { ...state.user, token: '' };
      state.isLoading = false;
      state.error = action.payload;
    },
    logoutStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    logoutSuccess: (state) => {
      state.user = { ...initialState.user, token: '' };
      state.isLoading = false;
      state.error = null;
    },
    logoutFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    /** 회원가입 정보 로컬스토리지 저장 */
    setUserInfo(state, action) {
      console.log(action);
      saveUserInfo(action.payload);
      state.error = null;
    },
  },
  /** 로그인 한 사용자 정보 받아오기 */
  extraReducers: (builder) => {
    builder
      .addCase(getUserInfoAPI.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(getUserInfoAPI.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user.username = action.payload.username;
      })
      .addCase(getUserInfoAPI.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logoutStart,
  logoutSuccess,
  logoutFailure,
  setUserInfo,
  setNickname,
} = authSlice.actions;

export default authSlice.reducer;
