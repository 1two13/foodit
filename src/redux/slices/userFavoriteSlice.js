import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOTAL_SEARCHED_OUTPUT } from '../../static/constants';
import total from '../../images/total.png';
import { addFavoriteAPI } from '../api/userInfoUpdateAPI';

export const addFavorite = createAsyncThunk('userFavorite/addFavorite', async ({ username, categories }) => {
  try {
    await addFavoriteAPI({ username, categories });
  } catch (error) {
    throw new Error(error.message);
  }
});

const userFavoriteSlice = createSlice({
  name: 'userFavorite',
  initialState: {
    username: '',
    categories: {
      category1: { id: 1, name: TOTAL_SEARCHED_OUTPUT, src: total },
      category2: { id: 2, name: '', src: '' },
      category3: { id: 3, name: '', src: '' },
      category4: { id: 4, name: '', src: '' },
      category5: { id: 5, name: '', src: '' },
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
      .addCase(addFavorite.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addFavorite.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addFavorite.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { addFavoriteCategory } = userFavoriteSlice.actions;
export default userFavoriteSlice.reducer;
