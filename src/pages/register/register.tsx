import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { registerUserApi, TRegisterData } from '@api';
import { setCookie } from '../../utils/cookie';
import { useNavigate } from 'react-router-dom';

export const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const registerData: TRegisterData = {
      email: email,
      name: userName,
      password: password
    };
    try {
      const response = await registerUserApi(registerData);
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
    } catch (err) {
      alert('что-то было сделано не так!');
    }
  };

  return (
    <RegisterUI
      errorText=''
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
