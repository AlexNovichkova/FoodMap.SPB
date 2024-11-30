import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice';
import restaurantsSlice from './slices/restaurantsSlice';
import categoriesSlice from './slices/categoriesSlice';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook,
} from 'react-redux';

const rootReducer = combineReducers({
  restaurants: restaurantsSlice,
  categories: categoriesSlice,
  user: userSlice,
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
