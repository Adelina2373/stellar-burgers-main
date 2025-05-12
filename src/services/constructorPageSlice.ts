import { TIngredient, TOrder } from '@utils-types';
import { getIngredientsApi, orderBurgerApi } from './../utils/burger-api';
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
export const orderBurger = createAsyncThunk(
  'construnstor/orderBurger',
  async (data: Array<string>, thunkAPI) => {
    try {
      const response = await orderBurgerApi(data);
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

interface ConstructorState {
  ingredients: Array<TIngredient>;
  isLoading: boolean;
  constructorItems: {
    bun: TIngredient | null;
    ingredients: Array<TIngredient>;
  };
  orderRequest: boolean;
  orderModalData: TOrder | null;
}

const initialState: ConstructorState = {
  ingredients: [],
  isLoading: false,
  constructorItems: {
    bun: null,
    ingredients: []
  },
  orderRequest: false,
  orderModalData: null
};

const constructorPageSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addIngredient: (state, action) => {
      if (action.payload.type == 'bun') {
        state.constructorItems.bun = action.payload;
      } else {
        state.constructorItems.ingredients.push(action.payload);
      }
    },
    deleteIngredient: (state, action) => {
      const currentIngredientIndex =
        state.constructorItems.ingredients.findIndex(
          (ingredient) => ingredient._id === action.payload._id
        );
      state.constructorItems.ingredients.splice(currentIngredientIndex, 1);
    },
    moveDownIngredient: (state, action) => {
      const currentIngredient =
        state.constructorItems.ingredients[action.payload];
      state.constructorItems.ingredients.splice(action.payload, 1);
      state.constructorItems.ingredients.splice(
        action.payload + 1,
        0,
        currentIngredient
      );
    },
    moveUpIngredient: (state, action) => {
      const currentIngredient =
        state.constructorItems.ingredients[action.payload];
      state.constructorItems.ingredients.splice(action.payload, 1);
      state.constructorItems.ingredients.splice(
        action.payload - 1,
        0,
        currentIngredient
      );
    },
    closeModal: (state) => {
      state.orderModalData = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.ingredients = action.payload;
        state.isLoading = false;
        console.log(state.ingredients);
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        console.log('Constructor Error');
        state.isLoading = false;
      });
    builder
      .addCase(orderBurger.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(orderBurger.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload.order;
        state.constructorItems.bun = null;
        state.constructorItems.ingredients.splice(
          0,
          state.constructorItems.ingredients.length
        );
      })
      .addCase(orderBurger.rejected, (state, action) => {
        state.orderRequest = false;
        console.log('orderBurger Error');
      });
  }
});

export const {
  addIngredient,
  deleteIngredient,
  moveDownIngredient,
  moveUpIngredient,
  closeModal
} = constructorPageSlice.actions;

export default constructorPageSlice.reducer;
