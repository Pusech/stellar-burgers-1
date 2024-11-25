import { rootReducer } from './store';
import {
  TIngredient,
  TConstructorIngredient,
  TOrder,
  TUser
} from '../utils/types';

import { initialState as feedInitial } from './slices/feedSlice';
import { initialState as ingredientsInitial } from './slices/ingredientsSlice';
import { initialState as orderInitial } from './slices/orderSlice';
import { initialState as constructorInitial } from './slices/constructorSlice';
import { initialState as userInitial } from './slices/userSlice';
import { initialState as ordersInitial } from './slices/ordersSlice';

describe('rootReducer', () => {
  it('должен возвращать начальное состояние, если state равен undefined', () => {
    const initialState = rootReducer(undefined, { type: '@@INIT' });

    expect(initialState).toEqual({
      user: userInitial,
      ingredients: ingredientsInitial,
      order: orderInitial,
      orders: ordersInitial,
      feed: feedInitial,
      constructorBurger: constructorInitial
    });
  });

  it('должен возвращать текущее состояние, если экшен не обработан', () => {
    const currentState = {
      user: {
        user: { name: 'Admin Admenov', email: 'admin@mail.com' },
        isLoading: false,
        error: null
      },
      ingredients: {
        ingredients: [
          {
            _id: '1',
            name: 'Bun',
            type: 'bun',
            proteins: 10,
            fat: 5,
            carbohydrates: 20,
            calories: 250,
            price: 100,
            image: 'image.jpg',
            image_large: 'image_large.jpg',
            image_mobile: 'image_mobile.jpg'
          } as TIngredient
        ],
        isLoading: false,
        status: 'loaded'
      },
      order: {
        currentOrder: {
          _id: 'order1',
          status: 'done',
          name: 'Burger Order',
          createdAt: '2024-11-24',
          updatedAt: '2024-11-24',
          number: 1,
          ingredients: ['1']
        } as TOrder,
        error: null,
        isLoading: false
      },
      orders: {
        orders: [
          {
            _id: 'order2',
            status: 'pending',
            name: 'Order 2',
            createdAt: '2024-11-23',
            updatedAt: '2024-11-23',
            number: 2,
            ingredients: ['1', '2']
          } as TOrder
        ],
        error: null,
        isLoading: false
      },
      feed: {
        orders: [],
        total: 0,
        totalToday: 0,
        error: null,
        isLoading: false
      },
      constructorBurger: {
        bun: {
          _id: '1',
          name: 'Bun',
          type: 'bun',
          proteins: 10,
          fat: 5,
          carbohydrates: 20,
          calories: 250,
          price: 100,
          image: 'image.jpg',
          image_large: 'image_large.jpg',
          image_mobile: 'image_mobile.jpg'
        } as TIngredient,
        ingredients: [
          {
            _id: '2',
            name: 'Cheese',
            type: 'main',
            proteins: 15,
            fat: 10,
            carbohydrates: 5,
            calories: 300,
            price: 50,
            image: 'cheese.jpg',
            image_large: 'cheese_large.jpg',
            image_mobile: 'cheese_mobile.jpg',
            id: 'unique-id-2'
          } as TConstructorIngredient
        ]
      }
    };

    const nextState = rootReducer(currentState, { type: 'UNKNOWN_ACTION' });

    expect(nextState).toEqual(currentState); // Состояние не должно изменяться
  });
});
