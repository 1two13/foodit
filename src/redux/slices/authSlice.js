import { createSlice } from '@reduxjs/toolkit';
import { saveUserInfo } from '../api/authApi';
import { getUserInfoAPI } from '../api/userInfoUpdateAPI';

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
    loginSuccess(state) {
      state.isLoading = false;
      getUserInfoAPI();
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
    /** 회원가입 정보 로컬스토리지 저장 */
    setUserInfo(state, action) {
      state.user = action.payload;
      saveUserInfo(state.user);
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

export const { loginStart, loginSuccess, loginFailure, logoutStart, logoutSuccess, logoutFailure, setUserInfo } =
  authSlice.actions;

export default authSlice.reducer;
