import { FC, SyntheticEvent, useState } from 'react';
import { useDispatch } from 'src/features/store';
import { registerUser } from 'src/features/slices/userSlice';
import { RegisterUI } from './RegisterUI';

export const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    console.log('Register', {
      name: userName,
      email,
      password
    });
    dispatch(registerUser({ name: userName, email, password }));
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
