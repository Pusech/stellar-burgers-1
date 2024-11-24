import constructorReducer, {
  addBun,
  addIngredient,
  removeIngredientByIndex,
  clearConstructor,
  moveIngredient,
  ConstructorState,
  initialState
} from '../slices/constructorSlice';
import { TIngredient, TConstructorIngredient } from '../../utils/types';

describe('constructorSlice tests', () => {
  const mockBun: TIngredient = {
    _id: '1',
    name: 'Булочка',
    type: 'bun',
    proteins: 20,
    fat: 10,
    carbohydrates: 50,
    calories: 300,
    price: 100,
    image: 'image_url',
    image_large: 'image_large_url',
    image_mobile: 'image_mobile_url'
  };

  const mockIngredient: TConstructorIngredient = {
    ...mockBun,
    id: '2'
  };

  test('addBun', () => {
    expect(constructorReducer(initialState, addBun(mockBun))).toEqual({
      ...initialState,
      bun: mockBun
    });
  });

  test('addIngredient', () => {
    expect(
      constructorReducer(initialState, addIngredient(mockIngredient))
    ).toEqual({
      ...initialState,
      ingredients: [mockIngredient]
    });
  });

  test('removeIngredientByIndex', () => {
    const state: ConstructorState = {
      ...initialState,
      ingredients: [mockIngredient]
    };

    expect(
      constructorReducer(state, removeIngredientByIndex({ index: 0 }))
    ).toEqual({
      ...initialState,
      ingredients: []
    });
  });

  test('clearConstructor', () => {
    const state: ConstructorState = {
      bun: mockBun,
      ingredients: [mockIngredient]
    };

    expect(constructorReducer(state, clearConstructor())).toEqual(initialState);
  });

  test('moveIngredient up', () => {
    const state: ConstructorState = {
      ...initialState,
      ingredients: [
        { ...mockIngredient, id: '1' },
        { ...mockIngredient, id: '2' }
      ]
    };

    expect(
      constructorReducer(state, moveIngredient({ index: 1, direction: 'up' }))
    ).toEqual({
      ...state,
      ingredients: [
        { ...mockIngredient, id: '2' },
        { ...mockIngredient, id: '1' }
      ]
    });
  });

  test('moveIngredient down', () => {
    const state: ConstructorState = {
      ...initialState,
      ingredients: [
        { ...mockIngredient, id: '1' },
        { ...mockIngredient, id: '2' }
      ]
    };

    expect(
      constructorReducer(state, moveIngredient({ index: 0, direction: 'down' }))
    ).toEqual({
      ...state,
      ingredients: [
        { ...mockIngredient, id: '2' },
        { ...mockIngredient, id: '1' }
      ]
    });
  });

  test('moveIngredient invalid index', () => {
    const state: ConstructorState = {
      ...initialState,
      ingredients: [
        { ...mockIngredient, id: '1' },
        { ...mockIngredient, id: '2' }
      ]
    };

    expect(
      constructorReducer(state, moveIngredient({ index: -1, direction: 'up' }))
    ).toEqual(state);

    expect(
      constructorReducer(state, moveIngredient({ index: 5, direction: 'down' }))
    ).toEqual(state);
  });
});
