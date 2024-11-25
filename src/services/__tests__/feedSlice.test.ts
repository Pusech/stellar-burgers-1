import feedReducer, { getFeeds, initialState } from '../slices/feedSlice';

describe('feedSlice test', () => {
  test('getFeed feedSlice', () => {
    expect(feedReducer(undefined, { type: getFeeds.pending.type })).toEqual({
      ...initialState,
      isLoading: true
    });

    const payload = {
      orders: [
        {
          _id: 123,
          status: 'Выполнен',
          name: 'Супер бургер',
          createdAt: '',
          updatedAt: '',
          number: 12345,
          ingredients: [
            '643d69a5c3f7b9001cfa093c',
            '643d69a5c3f7b9001cfa0941',
            '643d69a5c3f7b9001cfa093c'
          ]
        }
      ],
      total: 123,
      totalToday: 456
    };

    expect(
      feedReducer(undefined, {
        type: getFeeds.fulfilled.type,
        payload: payload
      })
    ).toEqual({
      ...initialState,
      orders: payload.orders,
      total: payload.total,
      totalToday: payload.totalToday,
      isLoading: false
    });

    const error = 'Ошибка получения feed';
    expect(
      feedReducer(undefined, {
        type: getFeeds.rejected.type,
        error: { message: error }
      })
    ).toEqual({
      ...initialState,
      isLoading: false,
      error
    });
  });
});
