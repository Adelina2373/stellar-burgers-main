import { fetchAllProfileOrders } from '@services/index';
import { RootState } from '@services/rootReducer';
import { useAppDispatch, useAppSelector } from '@services/store';
import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useAppDispatch();
  const { orders } = useAppSelector((state: RootState) => state.profilePage);

  useEffect(() => {
    dispatch(fetchAllProfileOrders());
  }, []);

  return <ProfileOrdersUI orders={orders} />;
};
