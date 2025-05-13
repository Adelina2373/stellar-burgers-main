import { TIngredient, TOrder, TUser } from '@utils-types';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getFeedsApi,
  getIngredientsApi,
  getUserApi,
  logoutApi,
  TRegisterData,
  updateUserApi
} from '@api';
import { fetchAllOrders, fetchFeedIngredients } from './feedsPageSlice';
import { deleteCookie, setCookie } from '../utils/cookie';

export const getUser = createAsyncThunk(
  'profile/getUser',
  async (_, thunkAPI) => {
    try {
      const response = await getUserApi();
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);
export const updateUser = createAsyncThunk(
  'profile/updateUser',
  async (data: TRegisterData, thunkAPI) => {
    try {
      const response = await updateUserApi(data);
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);
export const logout = createAsyncThunk(
  'profile/logout',
  async (_, thunkAPI) => {
    try {
      const response = await logoutApi();
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);
export const fetchProfileIngredients = createAsyncThunk(
  'profile/ingredients',
  async (_, thunkAPI) => {
    try {
      const response = await getIngredientsApi();
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);
export const fetchAllProfileOrders = createAsyncThunk(
  'profile/orders',
  async (_, thunkAPI) => {
    try {
      const response = await getFeedsApi();
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

interface ProfileState {
  user: TUser;
  password: string;
  orders: Array<TOrder>;
  ingredients: TIngredient[];
}

const initialState: ProfileState = {
  user: {
    name: '',
    email: ''
  },
  password: '',
  orders: [],
  ingredients: []
};

const profilePageSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {})
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })
      .addCase(getUser.rejected, (state, action) => {
        console.log('feed Error');
      });
    builder
      .addCase(updateUser.pending, (state) => {})
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })
      .addCase(updateUser.rejected, (state, action) => {
        console.log('feed Error');
      });
    builder
      .addCase(fetchAllProfileOrders.pending, (state) => {})
      .addCase(fetchAllProfileOrders.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
      })
      .addCase(fetchAllProfileOrders.rejected, (state, action) => {
        console.log('feed Error');
      });
    builder
      .addCase(logout.pending, (state) => {})
      .addCase(logout.fulfilled, (state, action) => {
        deleteCookie('accessToken');
        localStorage.removeItem('refreshToken');
      })
      .addCase(logout.rejected, (state, action) => {
        console.log('feed Error');
      });
    builder
      .addCase(fetchProfileIngredients.pending, (state) => {})
      .addCase(fetchProfileIngredients.fulfilled, (state, action) => {
        state.ingredients = action.payload;
      })
      .addCase(fetchProfileIngredients.rejected, (state, action) => {
        console.log('feed Error');
      });
  }
});

export default profilePageSlice.reducer;
