import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient, TConstructorIngredient, TOrder } from '../../utils/types';

export interface ConstructorState {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
}

const initialState: ConstructorState = {
  bun: null,
  ingredients: []
};

export const constructorSlice = createSlice({
  name: 'constructorBurger',
  initialState,
  reducers: {
    addBun: (state, action: PayloadAction<TIngredient>) => {
      state.bun = action.payload;
    },
    addIngredient: (state, action: PayloadAction<TConstructorIngredient>) => {
      state.ingredients.push(action.payload);
    },

    clearConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    },

    moveIngredient: (
      state,
      action: PayloadAction<{ index: number; direction: 'up' | 'down' }>
    ) => {
      const { index, direction } = action.payload;

      if (index < 0 || index >= state.ingredients.length) return;

      const newIndex = direction === 'up' ? index - 1 : index + 1;

      if (newIndex < 0 || newIndex >= state.ingredients.length) return;

      const itemToMove = state.ingredients[index];
      state.ingredients.splice(index, 1);
      state.ingredients.splice(newIndex, 0, itemToMove);
    },
    removeIngredientByIndex: (
      state,
      action: PayloadAction<{ index: number }>
    ) => {
      const { index } = action.payload;
      if (index < 0 || index >= state.ingredients.length) return;
      state.ingredients.splice(index, 1);
    }
  }
});

export const {
  addBun,
  addIngredient,
  removeIngredientByIndex,
  clearConstructor,
  moveIngredient
} = constructorSlice.actions;

export default constructorSlice.reducer;
