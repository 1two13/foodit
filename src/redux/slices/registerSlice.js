import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: '',
  password: '',
  passwordCheck: '',
  nickname: '',
  errors: {
    email: { message: '아이디를 입력해주세요.', isError: false },
    password: { message: '8~16자리의 비밀번호를 입력해주세요.', isError: false },
    passwordCheck: { message: '확인을 위하여 위와 동일하게 입력해주세요.', isError: false },
    nickname: { message: '', isError: false },
  },
};

const registerSlice = createSlice({
  name: 'signup',
  initialState,
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setPasswordCheck: (state, action) => {
      state.passwordCheck = action.payload;
    },
    setNickname: (state, action) => {
      state.nickname = action.payload;
    },
    setErrors: (state, action) => {
      state.errors = action.payload;
    },
    resetFields: (state, action) => {
      state.nickname = '';
      state.email = '';
      state.password = '';
      state.passwordCheck = '';
      state.errors = {};
    },
  },
});

export const { setEmail, setPassword, setPasswordCheck, setNickname, setErrors, resetFields } = registerSlice.actions;

export default registerSlice.reducer;
