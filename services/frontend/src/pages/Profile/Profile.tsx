import React, { SyntheticEvent, useEffect, useState } from 'react';
import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { ProfileMenuUI, ProfileUI } from './ui/ProfileUI/ProfileUI';
import { useDispatch, useSelector } from '../../features/store';
import { logoutUser, updateUser } from '../../features/slices/userSlice';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};

export const Profile: FC = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const [formValue, setFormValue] = useState({
    image: '',
    username: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    if (user) {
      setFormValue({
        image: user.image || '',
        username: user.username || '',
        email: user.email || '',
        password: '',
      });
    }
  }, [user]);

  const isFormChanged =
    formValue.image !== user?.image ||
    formValue.username !== user?.username ||
    formValue.email !== user?.email ||
    !!formValue.password;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(updateUser(formValue));
    setFormValue({
      image: formValue.image,
      username: formValue.username,
      email: formValue.email,
      password: '',
    });
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      image: user?.image || '',
      username: user?.username || '',
      email: user?.email || '',
      password: '',
    });
  };
  const file2Base64 = (file: File): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result?.toString() || '');
      reader.onerror = (error) => reject(error);
    });
  };

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;

    if (name === 'image' && files?.[0]) {
      try {
        const base64 = await file2Base64(files[0]);
        setFormValue((prevState) => ({
          ...prevState,
          image: base64,
        }));
      } catch (error) {
        console.error('Error converting file to Base64:', error);
      }
    } else {
      setFormValue((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  return (
    <ProfileUI
      handleLogout={handleLogout}
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );
};
