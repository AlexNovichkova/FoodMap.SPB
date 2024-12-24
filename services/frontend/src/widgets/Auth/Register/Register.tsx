import { FC, useState } from 'react';
import { useDispatch } from 'src/features/store';
import { registerUser } from 'src/features/slices/userSlice';
import { RegisterUI } from './RegisterUI';
import { useForm } from 'src/shared/ui/hooks/useForm/useForm';
import { LoadingOverlay } from 'src/widgets/LoadingOverlay';

export const Register: FC = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const validateField = (name: string, value: string) => {
    if (name === 'email')
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
        ? ''
        : 'Введите корректный email.';
    if (name === 'password')
      return value.length >= 6 ? '' : 'Пароль должен быть не менее 6 символов.';
    if (name === 'username')
      return value.length >= 2
        ? ''
        : 'Имя не может содержать менее 2 символов.';
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
  } = useForm({ username: '', email: '', password: '' }, validateField);

  const onSubmit = () => {
    setIsLoading(true);
    dispatch(registerUser(formData))
      .unwrap()
      .catch(() => setGeneralError('Пользователь уже существует'))
      .finally(() => setIsLoading(false));
  };
  const isFormValid = !Object.values(errors).some((error) => error);
  return (
    <>
      {isLoading && <LoadingOverlay message="Отправляем данные, подождите" />}
      <RegisterUI
        formData={formData}
        errors={errors}
        generalError={generalError}
        onInputChange={handleInputChange}
        onBlur={handleBlur}
        onSubmit={() => handleSubmit(onSubmit)}
        isFormValid={isFormValid}
      />
    </>
  );
};
