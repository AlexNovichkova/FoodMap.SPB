import { FC, SyntheticEvent, useState } from 'react';
import { loginUser } from 'src/features/slices/userSlice';
import { useDispatch } from 'src/features/store';
import { LoginUI } from './LoginUI';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorText, setErrorText] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const dispatch = useDispatch();
  let isValid = true;
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    const passwordRegex = /^.{6,}$/;
    return passwordRegex.test(password);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (!password || !validatePassword(password)) {
      setPasswordError(true);
      setErrorText('Пароль должен содержать не менее 6 символов.');
      isValid = false;
    } else {
      setPasswordError(false);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (!email || !validateEmail(email)) {
      setEmailError(true);
      setErrorText('Введите корректный email.');
      isValid = false;
    } else {
      setEmailError(false);
    }
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    if (!email || !validateEmail(email)) {
      setEmailError(true);
      setErrorText('Введите корректный email.');
      isValid = false;
    } else {
      setEmailError(false);
    }

    if (!password || !validatePassword(password)) {
      setPasswordError(true);
      setErrorText('Пароль должен содержать не менее 6 символов.');
      isValid = false;
    } else {
      setPasswordError(false);
    }

    if (
      (!password || !validatePassword(password)) &&
      (!email || !validateEmail(email))
    ) {
      setPasswordError(true);
      setErrorText('Неккоректные данные для входа');
      isValid = false;
    } else {
      setPasswordError(false);
    }

    if (isValid) {
      dispatch(loginUser({ email, password }))
        .unwrap()
        .catch(() => setErrorText('Пользователь не найден'));
    }
  };

  return (
    <LoginUI
      errorText={errorText}
      email={email}
      handleEmailChange={handleEmailChange}
      handlePasswordChange={handlePasswordChange}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
      emailError={emailError}
      passwordError={passwordError}
    />
  );
};
