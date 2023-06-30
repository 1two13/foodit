import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  imageUrl: null,
  title: '',
  category: '전체',
  totalAmount: 0,
  maxPeople: 1,
  textarea: '',
  writingPage: false,
};

export const writingSlice = createSlice({
  name: 'writing',
  initialState,
  reducers: {
    setImageUrl: (state, action) => {
      state.imageUrl = action.payload;
      localStorage.setItem('imageUrl', JSON.stringify(state.imageUrl));
    },
    setTitle: (state, action) => {
      state.title = action.payload;
      localStorage.setItem('title', JSON.stringify(state.title));
    },
    setCategory: (state, action) => {
      state.category = action.payload;
      localStorage.setItem('category', JSON.stringify(state.category));
    },
    setTotalAmount: (state, action) => {
      state.totalAmount = action.payload;
      localStorage.setItem('totalAmount', JSON.stringify(state.totalAmount));
    },
    setMaxPeople: (state, action) => {
      state.maxPeople = action.payload;
      localStorage.setItem('maxPeople', JSON.stringify(state.maxPeople));
    },
    setTextarea: (state, action) => {
      state.textarea = action.payload;
      localStorage.setItem('textarea', JSON.stringify(state.textarea));
    },
    wasWritingPage: (state, action) => {
      state.writingPage = true;
    },
  },
});
