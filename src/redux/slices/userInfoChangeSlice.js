import { createSlice } from '@reduxjs/toolkit';
import { updateNicknameAPI } from '../api/userInfoUpdateAPI';

const userInfoChangeSlice = createSlice({
  name: 'userInfoChange',
  initialState: {
    newPassword: '',
    newPasswordCheck: '',
    currentNickname: '',
    newNickname: '',
    errors: {
      newPassword: { message: '8~16자리의 비밀번호를 입력해주세요.', isError: false },
      newPasswordCheck: { message: '', isError: false },
      newNickname: { message: '', isError: false },
    },
    updateError: null,
    isLoading: false,
  },
  reducers: {
    setNewPassword: (state, action) => {
      state.newPassword = action.payload;
    },
    setNewPasswordCheck: (state, action) => {
      state.newPasswordCheck = action.payload;
    },
    getCurrentNickname: (state, action) => {
      state.currentNickname = action.payload;
    },
    setNewNickname: (state, action) => {
      state.newNickname = action.payload;
    },
    setErrors: (state, action) => {
      state.errors = action.payload;
    },
    resetFields: (state) => {
      state.userId = '';
      state.newPassword = '';
      state.newPasswordCheck = '';
      state.errors = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateNicknameAPI.pending, (state) => {
        state.isLoading = true;
        state.updateError = null;
      })
      .addCase(updateNicknameAPI.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentNickname = action.payload;
        state.updateError = null;
      })
      .addCase(updateNicknameAPI.rejected, (state, action) => {
        state.isLoading = false;
        state.updateError = action.payload;
        alert('닉네임을 입력해주세요.');
      });
  },
});

export const {
  setNewPasswordCheck,
  setNewPassword,
  getCurrentNickname,
  setNewNickname,
  setErrors,
  resetFields,
} = userInfoChangeSlice.actions;

export default userInfoChangeSlice.reducer;