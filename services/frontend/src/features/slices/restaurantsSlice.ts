import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getRestaurantsApi } from '../../entities/projects/api/api';
import { TRestaurant } from '../../entities/projects/models/types';

type TRestaurantsState = {
  restaurants: TRestaurant[];
  isLoading: boolean;
  error: string | null;
};

const initialState: TRestaurantsState = {
  restaurants: [],
  isLoading: true,
  error: null,
};

export const fetchRestaurants = createAsyncThunk(
  'restaurants/getAllRestaurants',
  async () => await getRestaurantsApi()
);
const restaurantsSlice = createSlice({
  name: 'restaurants',
  initialState,
  reducers: {},
  selectors: {
    selectRestaurants: (sliceState) => sliceState.restaurants,
    selectIsLoading: (sliceState) => sliceState.isLoading,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRestaurants.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchRestaurants.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || null;
      })
      .addCase(fetchRestaurants.fulfilled, (state, action) => {
        state.restaurants = action.payload;
        state.isLoading = false;
      });
  },
});
export const { selectRestaurants, selectIsLoading } =
  restaurantsSlice.selectors;

export default restaurantsSlice.reducer;
