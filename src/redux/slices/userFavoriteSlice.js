import { createSlice } from '@reduxjs/toolkit';
import { TOTAL_SEARCHED_OUTPUT } from '../../static/constants';
import total from '../../images/total.png';

const userFavoriteSlice = createSlice({
  name: 'userFavorite',
  initialState: {
    username: '',
    category1: { name: TOTAL_SEARCHED_OUTPUT, src: total },
    category2: { name: '', src: '' },
    category3: { name: '', src: '' },
    category4: { name: '', src: '' },
    category5: { name: '', src: '' },
  },
  reducers: {
    addFavoriteCategory: (state, action) => {
      const { name, src } = action.payload;
      const emptyCategory = Object.keys(state).find((key) => state[key].name === '');

      if (emptyCategory) {
        state[emptyCategory] = { name, src };
      }
    },
  },
});

export const { setCategory1, setCategory2, setCategory3, setCategory4, setCategory5, addFavoriteCategory } =
  userFavoriteSlice.actions;
export default userFavoriteSlice.reducer;
