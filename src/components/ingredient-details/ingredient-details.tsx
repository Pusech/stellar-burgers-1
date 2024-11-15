import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useLocation, useParams } from 'react-router-dom';
import { RootState, useSelector } from '../../services/store';

export const IngredientDetails: FC = () => {
  const { id } = useParams();
  const location = useLocation();
  const isModal = location.state?.background;

  const ingredients = useSelector(
    (state: RootState) => state.ingredients.ingredients
  );

  const ingredientData = ingredients.find(
    (ingredient) => ingredient._id === id
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return (
    <IngredientDetailsUI ingredientData={ingredientData} isModal={isModal} />
  );
};
