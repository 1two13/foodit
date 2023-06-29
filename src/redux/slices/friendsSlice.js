import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  friendsList: [false, false, false, false],
  recruteList: ['', '', '', ''],
};

export const friendsSlice = createSlice({
  name: 'friends',
  initialState,
  reducers: {
    setFriendsList: (state, action) => {
      state.friendsList = action.payload;
    },
    setRecruteList: (state, action) => {
      state.recruteList = action.payload;
    },
  },
});
