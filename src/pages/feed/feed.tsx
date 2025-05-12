import { useAppDispatch, useAppSelector } from '@services/store';
import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import {
  fetchAllOrders,
  fetchFeedIngredients,
  RootState
} from '@services/index';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useAppDispatch();
  const { orders } = useAppSelector((state: RootState) => state.feedPage);

  useEffect(() => {
    dispatch(fetchFeedIngredients());
    dispatch(fetchAllOrders());
  }, []);

  if (!orders.length) {
    return <Preloader />;
  }
  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        dispatch(fetchAllOrders());
      }}
    />
  );
};
