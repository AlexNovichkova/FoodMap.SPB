import { FC, SyntheticEvent, useState } from 'react';
import { loginUser } from 'src/features/slices/userSlice';
import { useDispatch } from 'src/features/store';
import { LoginUI } from './LoginUI';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    dispatch(loginUser({ email, password }));
  };

  return (
    <LoginUI
      errorText=""
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
