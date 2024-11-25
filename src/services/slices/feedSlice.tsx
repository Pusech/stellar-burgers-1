import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '../../utils/types';
import { getFeedsApi } from '@api';

export type FeedState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  error: string | null;
  isLoading: boolean;
};

export const initialState: FeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  error: null,
  isLoading: false
};

// Thunks
export const getFeeds = createAsyncThunk('feed/getFeeds', async () => {
  const response = await getFeedsApi();
  return response;
});

// Слайс
const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  selectors: {
    selectFeedOrders: (state: FeedState) => state.orders,
    selectFeedTotal: (state: FeedState) => state.total,
    selectFeedTotalToday: (state: FeedState) => state.totalToday,
    selectFeedError: (state: FeedState) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
        state.isLoading = false;
      })
      .addCase(getFeeds.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to fetch feeds';
        state.isLoading = false;
      });
  }
});

export default feedSlice.reducer;
