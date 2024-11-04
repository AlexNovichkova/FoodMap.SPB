import React from 'react';
import { LogInIcon } from './LogInIcon';
import { useLocation, useNavigate } from 'react-router-dom';

export const LoginButton: React.FC<{
  title: string;
  onClick?: () => void;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
  className: string;
}> = ({ title, onClick, type, className }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const openLoginModal = () => {
    const { pathname, search } = location; // Извлекаем только нужные данные
    navigate('/login', { state: { background: { pathname, search } } });
  };

  return (
    <button
      onClick={openLoginModal}
      className={
        className +
        ` login_button h-14 text-base text-center rounded-[8px] cursor-pointer leading-6 border-none shadow-accent-orange focus:outline-none focus:shadow-green-400  active:shadow-green-400  hover:shadow-green-400 font-bold py-3 px-5 lg:text-lg 2xl:py-4 2xl:px-6 2xl:h-16 2xl:text-2xl transition-all`
      }
      type={type}
    >
      <div className={`flex gap-3 items-center justify-center mx-auto`}>
        <LogInIcon />
        <span className=' '>{title}</span>
      </div>
    </button>
  );
};
