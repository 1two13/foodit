import { createSlice } from '@reduxjs/toolkit';
import { TOTAL_SEARCHED_OUTPUT } from '../../static/constants';

const initialState = {
  category: TOTAL_SEARCHED_OUTPUT,
};

export const selectedCategorySlice = createSlice({
  name: 'selectedCategory',
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },
  },
});
