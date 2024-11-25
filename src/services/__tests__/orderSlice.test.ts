import orderReducer, {
  createOrder,
  fetchOrderByNumber,
  clearCurrentOrder,
  initialState
} from '../slices/orderSlice';
import { TOrder } from '@utils-types';

describe('orderSlice tests', () => {
  const mockOrder: TOrder = {
    _id: '12345',
    status: 'done',
    name: 'Бургер',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T01:00:00.000Z',
    number: 12345,
    ingredients: ['ingredient1', 'ingredient2']
  };

  test('createOrder pending', () => {
    expect(
      orderReducer(initialState, { type: createOrder.pending.type })
    ).toEqual({
      ...initialState,
      isLoading: true
    });
  });

  test('createOrder fulfilled', () => {
    expect(
      orderReducer(initialState, {
        type: createOrder.fulfilled.type,
        payload: mockOrder
      })
    ).toEqual({
      ...initialState,
      currentOrder: mockOrder,
      isLoading: false
    });
  });

  test('createOrder rejected', () => {
    const errorMessage = 'Failed to create order';
    expect(
      orderReducer(initialState, {
        type: createOrder.rejected.type,
        payload: errorMessage
      })
    ).toEqual({
      ...initialState,
      error: errorMessage,
      isLoading: false
    });
  });

  test('fetchOrderByNumber fulfilled', () => {
    expect(
      orderReducer(initialState, {
        type: fetchOrderByNumber.fulfilled.type,
        payload: mockOrder
      })
    ).toEqual({
      ...initialState,
      currentOrder: mockOrder
    });
  });

  test('clearCurrentOrder', () => {
    const stateWithOrder = {
      ...initialState,
      currentOrder: mockOrder
    };

    expect(orderReducer(stateWithOrder, clearCurrentOrder())).toEqual({
      ...stateWithOrder,
      currentOrder: null
    });
  });
});
