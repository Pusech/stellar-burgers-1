// короче тут почитать посмотреть подумать

import store, { RootState } from './store';

describe('Стор', () => {
  test('rootReducer', () => {
    const state: RootState = store.getState();

    expect(state.user).toEqual({
      user: null,
      isLoading: false,
      error: null
    });

    expect(state.ingredients).toEqual({
      ingredients: [],
      isLoading: false,
      status: 'idle'
    });

    expect(state.orders).toEqual({
      orders: [],
      error: null,
      isLoading: false
    });

    expect(state.feed).toEqual({
      orders: [],
      total: 0,
      totalToday: 0,
      error: null,
      isLoading: false
    });

    expect(state.constructorBurger).toEqual({
      bun: null,
      ingredients: []
    });
  });
});
