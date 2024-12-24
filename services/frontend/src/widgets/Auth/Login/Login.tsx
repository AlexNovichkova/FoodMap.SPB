import { FC, useState } from 'react';
import { loginUser } from 'src/features/slices/userSlice';
import { useDispatch } from 'src/features/store';
import { LoginUI } from './LoginUI';
import { useForm } from 'src/shared/ui/hooks/useForm/useForm';
import { LoadingOverlay } from 'src/widgets/LoadingOverlay';

export const Login: FC = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

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

  const {
    formData,
    errors,
    generalError,
    setGeneralError,
    handleInputChange,
    handleBlur,
    handleSubmit,
  } = useForm({ email: '', password: '' }, validateField);

  const onSubmit = () => {
    setIsLoading(true);
    dispatch(loginUser(formData))
      .unwrap()
      .catch(() => setGeneralError('Пользователь не найден.'))
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      {isLoading && <LoadingOverlay message="Вход в систему, подождите" />}
      <LoginUI
        formData={formData}
        errors={errors}
        generalError={generalError}
        onInputChange={handleInputChange}
        onBlur={handleBlur}
        onSubmit={() => handleSubmit(onSubmit)}
      />
    </>
  );
};
