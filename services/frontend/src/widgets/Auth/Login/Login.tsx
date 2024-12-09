import { FC, SyntheticEvent, useState } from 'react';
import { loginUser } from 'src/features/slices/userSlice';
import { useDispatch } from 'src/features/store';
import { LoginUI } from './LoginUI';

export const Login: FC = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [generalError, setGeneralError] = useState('');
  const dispatch = useDispatch();

  const validateField = (name: string, value: string) => {
    if (name === 'email') {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
        ? ''
        : 'Введите корректный email.';
    }
    if (name === 'password') {
      return value.length >= 6 ? '' : 'Пароль должен быть не менее 6 символов.';
    }
    return '';
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    setGeneralError(''); // Сбрасываем общую ошибку при любом изменении
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const newErrors: { email: string; password: string } = Object.keys(
      formData
    ).reduce((acc, key) => {
      const error = validateField(key, formData[key as keyof typeof formData]);
      return { ...acc, [key]: error };
    }, {} as { email: string; password: string });

    if (Object.values(newErrors).some((error) => error)) {
      setErrors(newErrors);
      return;
    }

    dispatch(loginUser(formData))
      .unwrap()
      .catch(() => setGeneralError('Пользователь не найден.'));
  };

  return (
    <LoginUI
      formData={formData}
      errors={errors}
      generalError={generalError}
      onInputChange={handleInputChange}
      onBlur={handleBlur}
      onSubmit={handleSubmit}
    />
  );
};
