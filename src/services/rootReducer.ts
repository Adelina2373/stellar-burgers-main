import { combineReducers } from '@reduxjs/toolkit';
import constructorPageReducer from './constructorPageSlice';

const rootReducer = combineReducers({
  constructorPage: constructorPageReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
