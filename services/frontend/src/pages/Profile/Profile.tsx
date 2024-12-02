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
    username: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    if (user) {
      setFormValue({
        username: user.username || '',
        email: user.email || '',
        password: '',
      });
    }
  }, [user]);

  const isFormChanged =
    formValue.username !== user?.username ||
    formValue.email !== user?.email ||
    !!formValue.password;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(updateUser(formValue));
    setFormValue({
      username: formValue.username,
      email: formValue.email,
      password: '',
    });
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      username: user?.username || '',
      email: user?.email || '',
      password: '',
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
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
