import { TIngredient } from '@utils-types';
import { getIngredientsApi } from './../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchIngredients = createAsyncThunk(
  'construnstor/ingredients',
  async (_, thunkAPI) => {
    try {
      const response = await getIngredientsApi();
      return response;
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
  }
);

const constructorPageSlice = createSlice({
  name: 'constructor',
  initialState: {
    ingredients: [] as TIngredient[],
    isLoading: false
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.ingredients = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        console.log('Constructor Error');
        state.isLoading = false;
      });
  }
});

export default constructorPageSlice.reducer
