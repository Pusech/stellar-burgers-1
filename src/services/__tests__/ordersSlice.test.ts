import ordersReducer, { getOrders } from '../slices/ordersSlice';

describe('ordersSlice', () => {
  const initialState = {
    orders: [],
    error: null,
    isLoading: false
  };

  test('initial state', () => {
    expect(ordersReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  test('getOrders.pending', () => {
    const action = { type: getOrders.pending.type };
    const state = ordersReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      isLoading: true
    });
  });

  test('getOrders.fulfilled', () => {
    const payload = [
      {
        _id: '1',
        status: 'done',
        name: 'Test Order',
        createdAt: '2023-10-10T00:00:00Z',
        updatedAt: '2023-10-10T01:00:00Z',
        number: 12345,
        ingredients: ['ingredient1', 'ingredient2']
      }
    ];

    const action = { type: getOrders.fulfilled.type, payload };
    const state = ordersReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      orders: payload,
      isLoading: false
    });
  });

  test('getOrders.rejected', () => {
    const errorMessage = 'Network error';
    const action = {
      type: getOrders.rejected.type,
      error: { message: errorMessage }
    };

    const state = ordersReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      error: errorMessage,
      isLoading: false
    });
  });
});
