import { TRegisterData } from '@api';
import {
  useAppDispatch,
  useAppSelector,
  RootState,
  getUser,
  updateUser,
  fetchFeedIngredients,
  fetchProfileIngredients
} from '@services/index';
import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';

export const Profile: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state: RootState) => state.profilePage);

  const [formValue, setFormValue] = useState({
    name: user.name,
    email: user.email,
    password: ''
  });

  useEffect(() => {
    dispatch(getUser());
    dispatch(fetchProfileIngredients());
  }, []);

  useEffect(() => {
    setFormValue((prevState) => ({
      ...prevState,
      name: user?.name || '',
      email: user?.email || ''
    }));
  }, [user]);

  const isFormChanged =
    formValue.name !== user?.name ||
    formValue.email !== user?.email ||
    !!formValue.password;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const updateData: TRegisterData = {
      name: formValue.name,
      email: formValue.email,
      password: formValue.password
    };
    dispatch(updateUser(updateData));
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      name: user.name,
      email: user.email,
      password: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );

  return null;
};
