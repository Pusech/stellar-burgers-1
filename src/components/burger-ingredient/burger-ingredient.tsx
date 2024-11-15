import { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';

import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';
import { AppDispatch, useDispatch } from '../../services/store';
import { addBun, addIngredient } from '../../services/slices/constructorSlice';
import { nanoid } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    const location = useLocation();
    const dispatch: AppDispatch = useDispatch();

    const handleAdd = () => {
      const ingredientToAdd: TConstructorIngredient = {
        ...ingredient,
        id: nanoid()
      };
      ingredient.type == 'bun'
        ? dispatch(addBun(ingredient))
        : dispatch(addIngredient(ingredientToAdd));
    };

    return (
      <BurgerIngredientUI
        ingredient={ingredient}
        count={count}
        locationState={{ background: location }}
        handleAdd={handleAdd}
      />
    );
  }
);
