import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import registerSlice from './slices/registerSlice';
import signinSlice from './slices/signinSlice';
import userInfoChangeSlice from './slices/userInfoChangeSlice';
import myPageSlice from './slices/myPageSlice';

import { writingSlice } from './slices/writingSlice';
import { selectedCategorySlice } from './slices/selectedCategorySlice';
import { friendsSlice } from './slices/friendsSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    register: registerSlice,
    signin: signinSlice,
    myPage: myPageSlice,
    userInfoChange: userInfoChangeSlice,
    writing: writingSlice.reducer,
    selectedCategory: selectedCategorySlice.reducer,
    friends: friendsSlice.reducer,
  },
});
