import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '../../utils/types';
import { getOrdersApi } from '@api';

type OrdersState = {
  orders: TOrder[];
  error: string | null;
  isLoading: Boolean;
};

const initialState: OrdersState = {
  orders: [],
  error: null,
  isLoading: false
};

// Thunks
export const getOrders = createAsyncThunk('orders/getOrders', async () => {
  const response = await getOrdersApi();
  return response;
});

// Слайс
const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  selectors: {
    selectOrders: (state: OrdersState) => state.orders,
    selectOrdersError: (state: OrdersState) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.isLoading = false;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to fetch orders';
        state.isLoading = false;
      });
  }
});

export default ordersSlice.reducer;
