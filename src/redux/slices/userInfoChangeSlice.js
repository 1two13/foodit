import { createSlice } from '@reduxjs/toolkit';
import { UserInfoUpdate } from '../api/userInfoUpdateAPI';

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
    updatePasswordStart(state) {
      state.isLoading = true;
      state.updateError = null;
    },
    updatePasswordSuccess(state, action) {
      state.isLoading = false;
      state.currentPassword = action.payload;
      UserInfoUpdate(state.currentPassword);
      state.updateError = null;
    },
    updatePasswordFailure(state, action) {
      state.isLoading = false;
      state.updateError = action.payload;
    },
    updateNicknameStart(state) {
      state.isLoading = true;
      state.updateError = null;
    },
    updateNicknameSuccess(state, action) {
      state.isLoading = false;
      state.currentNickname = action.payload;
      UserInfoUpdate(state.currentNickname);
      state.updateError = null;
    },
    updateNicknameFailure(state, action) {
      state.isLoading = false;
      state.updateError = action.payload;
      alert('닉네임을 입력해주세요.');
    },
    resetFields: (state) => {
      state.userId = '';
      state.newPassword = '';
      state.newPasswordCheck = '';
      state.errors = {};
    },
  },
});

export const {
  setNewPasswordCheck,
  setNewPassword,
  getCurrentNickname,
  setNewNickname,
  setErrors,
  updatePasswordStart,
  updatePasswordSuccess,
  updatePasswordFailure,
  updateNicknameStart,
  updateNicknameSuccess,
  updateNicknameFailure,
  resetFields,
} = userInfoChangeSlice.actions;
export default userInfoChangeSlice.reducer;
