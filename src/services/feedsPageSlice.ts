import { TIngredient, TOrder } from '@utils-types';
import {
  getFeedsApi,
  getIngredientsApi,
  getOrderByNumberApi
} from './../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchFeedIngredients = createAsyncThunk(
  'feed/ingredients',
  async (_, thunkAPI) => {
    try {
      const response = await getIngredientsApi();
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);
export const fetchAllOrders = createAsyncThunk(
  'feed/orders',
  async (_, thunkAPI) => {
    try {
      const response = await getFeedsApi();
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);
export const fetchOrderByNumber = createAsyncThunk(
  'feed/orderByNumber',
  async (id: number, thunkAPI) => {
    try {
      const response = await getOrderByNumberApi(id);
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

interface FeedState {
  orders: TOrder[];
  total: number;
  totalToday: number;
  ingredients: TIngredient[];
  orderData: TOrder | null;
}

const initialState: FeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  ingredients: [],
  orderData: null
};

const feedPageSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllOrders.pending, (state) => {})
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        console.log('feed Error');
      });
    builder
      .addCase(fetchFeedIngredients.pending, (state) => {})
      .addCase(fetchFeedIngredients.fulfilled, (state, action) => {
        state.ingredients = action.payload;
      })
      .addCase(fetchFeedIngredients.rejected, (state, action) => {
        console.log('Constructor Error');
      });
    builder
      .addCase(fetchOrderByNumber.pending, (state) => {})
      .addCase(fetchOrderByNumber.fulfilled, (state, action) => {
        state.orderData = action.payload.orders[0];
      })
      .addCase(fetchOrderByNumber.rejected, (state, action) => {
        console.log('Constructor Error');
      });
  }
});

export default feedPageSlice.reducer;
