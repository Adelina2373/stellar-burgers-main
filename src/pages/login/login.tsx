import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { loginUserApi, TLoginData } from '@api';
import { setCookie } from '../../utils/cookie';
import { useNavigate } from 'react-router-dom';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const loginData: TLoginData = {
      email: email,
      password: password
    };
    try {
      const response = await loginUserApi(loginData);
      console.log(response);
      if (response.success) {
        setCookie('accessToken', response.accessToken, {
          expires: 182 * 24 * 60 * 60
        });
        localStorage.setItem('refreshToken', response.refreshToken);
        navigate('/');
      } else {
        throw new Error('Что-то пошло не так');
      }
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <LoginUI
      errorText=''
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
