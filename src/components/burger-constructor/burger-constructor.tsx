import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const constructorItems = {
    bun: {
      price: 10
    },
    ingredients: [
      {
        calories: 4242,
        carbohydrates: 242,
        fat: 142,
        image: 'https://code.s3.yandex.net/react/code/meat-01.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
        name: 'Биокотлета из марсианской Магнолии',
        price: 424,
        proteins: 420,
        type: 'main',
        __v: 0,
        _id: '643d69a5c3f7b9001cfa0941'
      }
    ]
  };

  const orderRequest = false;

  const orderModalData = null;

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
  };
  const closeOrderModal = () => {};

  // const price = useMemo(
  //   () =>
  //     (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
  //     constructorItems.ingredients.reduce(
  //       (s: number, v: TConstructorIngredient) => s + v.price,
  //       0
  //     ),
  //   [constructorItems]
  // );

  const price = useMemo(() => {
    return 1;
  }, [constructorItems]);

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
