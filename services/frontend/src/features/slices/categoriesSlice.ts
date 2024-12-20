import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getCategoriesApi } from '../../entities/projects/api/api';
import { ICategory } from '../../entities/projects/models/types';

type TCategoriesState = {
  categories: ICategory[];
  isLoading: boolean;
  error: string | null;
};

const initialState: TCategoriesState = {
  categories: [],
  isLoading: true,
  error: null,
};

export const fetchCategories = createAsyncThunk(
  'categories/getAllCategories',
  async () => await getCategoriesApi()
);
const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  selectors: {
    selectCategories: (sliceState) => sliceState.categories,
    selectIsLoading: (sliceState) => sliceState.isLoading,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.isLoading = false;
      });
  },
});
export const { selectCategories, selectIsLoading } = categoriesSlice.selectors;

export default categoriesSlice.reducer;
