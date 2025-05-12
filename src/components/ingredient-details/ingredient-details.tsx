import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useAppSelector } from '@services/store';
import { RootState } from '@services/rootReducer';
import { useParams } from 'react-router-dom';
import { TIngredient } from '@utils-types';

export const IngredientDetails: FC = () => {
  const { id } = useParams<{ id: string }>();
  console.log(id);
  const { ingredients } = useAppSelector(
    (state: RootState) => state.constructorPage
  );
  /** TODO: взять переменную из стора */
  const ingredientData: TIngredient = ingredients.find(
    (ingredient) => ingredient._id == id
  )!;

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
