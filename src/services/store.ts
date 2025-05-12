import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import rootReducer from './rootReducer';
import { RootState } from './rootReducer';

// Создаем store первым
const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

// Получаем тип состояния напрямую из store
export type AppDispatch = typeof store.dispatch;

// Создаем типизированные хуки
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Опционально: если нужен AppSelector тип
export type AppSelector<Return> = (state: RootState) => Return;

export default store;
