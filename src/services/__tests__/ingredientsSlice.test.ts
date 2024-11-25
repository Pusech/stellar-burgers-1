import ingredientsReducer, {
  getIngredients,
  initialState
} from '../slices/ingredientsSlice';
import { TIngredient } from '../../utils/types';

describe('ingredientsSlice tests', () => {
  const mockIngredients: TIngredient[] = [
    {
      _id: '1',
      name: 'Ингредиент 1 соус',
      type: 'sauce',
      proteins: 10,
      fat: 5,
      carbohydrates: 20,
      calories: 100,
      price: 50,
      image: 'image_url_1',
      image_large: 'image_large_url_1',
      image_mobile: 'image_mobile_url_1'
    },
    {
      _id: '2',
      name: 'Ингредиент 2 мэйн',
      type: 'main',
      proteins: 15,
      fat: 10,
      carbohydrates: 25,
      calories: 150,
      price: 75,
      image: 'image_url_2',
      image_large: 'image_large_url_2',
      image_mobile: 'image_mobile_url_2'
    }
  ];

  test('pending getIngredients', () => {
    expect(
      ingredientsReducer(initialState, { type: getIngredients.pending.type })
    ).toEqual({
      ...initialState,
      isLoading: true,
      status: 'pending'
    });
  });

  test('fulfilled getIngredients', () => {
    expect(
      ingredientsReducer(initialState, {
        type: getIngredients.fulfilled.type,
        payload: mockIngredients
      })
    ).toEqual({
      ...initialState,
      isLoading: false,
      ingredients: mockIngredients,
      status: 'success'
    });
  });

  test('rejected getIngredients', () => {
    expect(
      ingredientsReducer(initialState, { type: getIngredients.rejected.type })
    ).toEqual({
      ...initialState,
      isLoading: false,
      status: 'fail'
    });
  });
});
