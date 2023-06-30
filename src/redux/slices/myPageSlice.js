import { createSlice } from '@reduxjs/toolkit';
import { inquireUserInfoAPI } from '../api/userInfoUpdateAPI';

const initialState = {
  username: '',
  isLoading: false,
  error: null,
};

const myPageSlice = createSlice({
  name: 'mypage',
  initialState,
  reducers: {
    getUserInfoStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    getUserInfoSuccess(state, action) {
      state.isLoading = false;
      state.username = action.payload;
      inquireUserInfoAPI(state.username);
      state.error = null;
    },
    getUserInfoFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { getUserInfoStart, getUserInfoSuccess, getUserInfoFailure } = myPageSlice.actions;

export default myPageSlice.reducer;
