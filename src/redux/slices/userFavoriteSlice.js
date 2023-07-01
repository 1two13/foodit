import { createSlice } from '@reduxjs/toolkit';
import { TOTAL_SEARCHED_OUTPUT } from '../../static/constants';
import total from '../../images/total.png';
import { addFavoriteAPI } from '../api/userInfoUpdateAPI';

const userFavoriteSlice = createSlice({
  name: 'userFavorite',
  initialState: {
    username: localStorage.getItem('username'),
    categories: {
      category1: { name: TOTAL_SEARCHED_OUTPUT, src: total },
      category2: { name: '', src: '' },
      category3: { name: '', src: '' },
      category4: { name: '', src: '' },
      category5: { name: '', src: '' },
    },
    loading: false,
    error: null,
  },
  reducers: {
    addFavoriteCategory: (state, action) => {
      const { name, src } = action.payload;
      const emptyCategory = Object.keys(state.categories).find((key) => state.categories[key].name === '');

      if (emptyCategory) {
        state.categories[emptyCategory] = { name, src };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addFavoriteAPI.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addFavoriteAPI.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addFavoriteAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { addFavoriteCategory } = userFavoriteSlice.actions;
export default userFavoriteSlice.reducer;
