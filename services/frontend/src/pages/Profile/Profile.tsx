import { SyntheticEvent, useEffect, useState } from 'react';
import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { ProfileMenuUI, ProfileUI } from './ui/ProfileUI/ProfileUI';
import { useDispatch, useSelector } from '../../features/store';
import { logoutUser, updateUser } from '../../features/slices/userSlice';
import { useForm } from 'src/shared/ui/hooks/useForm/useForm';
import { LoadingOverlay } from 'src/widgets/LoadingOverlay';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};

export const Profile: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const validateField = (name: string, value: string) => {
    if (name === 'email')
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
        ? ''
        : 'Введите корректный email.';
    if (name === 'password')
      return value.length >= 6 || value === ''
        ? ''
        : 'Пароль должен быть не менее 6 символов.';
    if (name === 'username')
      return value.length >= 2
        ? ''
        : 'Имя не может содержать менее 2 символов.';
    return '';
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const {
    formData,
    errors,
    generalError,
    handleInputChange,
    handleBlur,
    setFormData,
    handleSubmit,
  } = useForm(
    { image: '', username: '', email: '', password: '' },
    validateField
  );

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormData({
      image: user?.image || '',
      username: user?.username || '',
      email: user?.email || '',
      password: '',
    });
  };

  const isFormChanged =
    formData.image !== user?.image ||
    formData.username !== user?.username ||
    formData.email !== user?.email ||
    !!formData.password;

  useEffect(() => {
    if (user) {
      setFormData({
        image: user.image || '',
        username: user.username || '',
        email: user.email || '',
        password: '',
      });
    }
  }, [user, setFormData]);

  const onSubmit = () => {
    setIsLoading(true);
    dispatch(updateUser(formData)).finally(() => setIsLoading(false));
  };

  return (
    <>
      {isLoading && <LoadingOverlay message="Обновляем данные, подождите" />}
      <ProfileUI
        handleLogout={handleLogout}
        handleCancel={handleCancel}
        generalError={generalError}
        isFormChanged={isFormChanged}
        formData={formData}
        errors={errors}
        onInputChange={handleInputChange}
        onBlur={handleBlur}
        onSubmit={() => handleSubmit(onSubmit)}
      />
    </>
  );
};
