import { combineReducers } from '@reduxjs/toolkit';
import constructorPageReducer from './constructorPageSlice';
import feedPageReducer from './feedsPageSlice';
import profilePageReducer from './profilePageSlice';

const rootReducer = combineReducers({
  constructorPage: constructorPageReducer,
  feedPage: feedPageReducer,
  profilePage: profilePageReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
