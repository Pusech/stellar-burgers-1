import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { orderBurgerApi, getOrderByNumberApi } from '@api';
import { TOrder } from '@utils-types';

interface OrderState {
  currentOrder: TOrder | null;
  error: string | null;
  isLoading: boolean;
}

const initialState: OrderState = {
  currentOrder: null,
  error: null,
  isLoading: false
};

export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (data: string[]) => {
    const response = await orderBurgerApi(data);
    return response.order; // Возвращаем только объект заказа
  }
);

export const fetchOrderByNumber = createAsyncThunk(
  'order/fetchOrderByNumber',
  async (number: number) => {
    const response = await getOrderByNumberApi(number);
    return response.orders[0]; //первый заказ
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearCurrentOrder: (state: OrderState) => {
      state.currentOrder = null;
    }
  },
  selectors: {
    selectCurrentOrder: (state: OrderState) => state.currentOrder,
    // selectOrderStatus: (state: OrderState) => state.orderStatus,
    selectOrderError: (state: OrderState) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        // state.orderStatus = 'loading';
        state.isLoading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        // state.orderStatus = 'succeeded';
        state.currentOrder = action.payload;
        state.isLoading = false;
      })
      .addCase(createOrder.rejected, (state, action) => {
        // state.orderStatus = 'failed';
        state.error = action.payload as string;
        state.isLoading = false;
      })
      .addCase(fetchOrderByNumber.fulfilled, (state, action) => {
        // state.orderStatus = 'succeeded';
        state.currentOrder = action.payload;
      });
  }
});

export const { selectCurrentOrder } = orderSlice.selectors;
export const { clearCurrentOrder } = orderSlice.actions;
export default orderSlice.reducer;

//забыл убрать этот комментарий :)
