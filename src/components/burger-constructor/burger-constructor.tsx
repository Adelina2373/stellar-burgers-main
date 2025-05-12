import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import {
  useAppSelector,
  useAppDispatch,
  RootState,
  orderBurger,
  closeModal
} from '@services/index';
import { getCookie } from '../../utils/cookie';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const dispatch = useAppDispatch();
  const { constructorItems, orderRequest, orderModalData } = useAppSelector(
    (state: RootState) => state.constructorPage
  );
  const navigate = useNavigate();

  const onOrderClick = () => {
    if (!getCookie('accessToken')) {
      navigate('/register');
    }
    if (!constructorItems.bun || orderRequest) {
      return;
    }
    const allIngredients: Array<string> = [
      constructorItems.bun!._id,
      constructorItems.bun!._id,
      ...constructorItems.ingredients.map((ing) => ing._id)
    ];
    dispatch(orderBurger(allIngredients));
  };
  const closeOrderModal = () => {
    dispatch(closeModal());
  };

  const price = useMemo(() => {
    const bunPrice = constructorItems.bun ? constructorItems.bun.price * 2 : 0;

    const ingredientsPrice = (
      constructorItems.ingredients as TConstructorIngredient[]
    ).reduce(
      (sum: number, item: TConstructorIngredient) => sum + item.price,
      0
    );

    return bunPrice + ingredientsPrice;
  }, [constructorItems.bun, constructorItems.ingredients]);

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
