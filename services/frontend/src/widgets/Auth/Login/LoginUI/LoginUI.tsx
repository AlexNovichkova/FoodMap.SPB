import { FC } from 'react';
import { Link } from 'react-router-dom';
import { PageUIProps } from 'src/entities/projects/models/types';

import { Input } from 'src/shared/ui/Input';
import { MainButton } from 'src/shared/ui/MainButton';
import { PasswordInput } from 'src/shared/ui/PasswordInput';

export type LoginUIProps = PageUIProps & {
  formData: { email: string; password: string };
};

export const LoginUI: FC<LoginUIProps> = ({
  formData,
  errors,
  generalError,
  onInputChange,
  onBlur,
  onSubmit,
}) => {
  return (
    <div className={`pt-0 md:pt-3 xl:w-full xl:px-4 `}>
      <h3 className=" pb-4 md:pb-6 text-lg text-black-700   font-medium lg:text-xl xl:text-2xl  2xl:text-3xl 3xl:text-4xl">
        Вход
      </h3>
      <form className={`pb-15 `} name="login" onSubmit={onSubmit}>
        <>
          <div className="pb-4">
            <Input
              className="w-full"
              type="email"
              name="email"
              value={formData.email}
              onChange={onInputChange}
              onBlur={onBlur}
              placeholder="E-mail"
              error={!!errors.email}
              errorText={errors.email}
              label="Почта"
              tooltip="Введите email в формате example@domain.com"
            />
          </div>
          <div className="pb-4">
            <PasswordInput
              className="w-full"
              name="password"
              value={formData.password}
              onChange={onInputChange}
              onBlur={onBlur}
              placeholder="Пароль"
              error={!!errors.password}
              errorText={errors.password}
              label="Пароль"
              tooltip="Введите пароль не менее 6 символов"
            />
          </div>
          {generalError && (
            <p className=" text-base lg:text-lg xl:text-xl 2xl:text-2xl text-accent_orange font-bold">
              {generalError ? generalError : ''}
            </p>
          )}
        </>
      </form>
      <div
        className={`pb-4 pt-6 text-black-700   text text_type_main-default text-base lg:text-lg xl:text-xl 2xl:text-2xl 3xl:text-3xl font-normal  `}
      >
        Вы - новый пользователь?
        <Link
          to="/register"
          className={`pl-2 text-accent_green outline-none font-medium focus:text-green-400 focus:border-b hover:text-green-400 hover:border-b`}
        >
          Зарегистрироваться
        </Link>
      </div>
      {/*<div
        className={` text text-black-700  text_type_main-default pb-6 text-base lg:text-lg xl:text-xl 2xl:text-2xl font-normal `}
      >
        Забыли пароль?
        <Link
          to={'/forgot-password'}
          className={`pl-2 text-accent_green outline-none font-medium focus:text-green-400 focus:border-b hover:text-green-400 hover:border-b`}
        >
          Восстановить пароль
        </Link>
      </div>*/}
      <div className=" flex items-center min-h-16">
        <MainButton
          className=" w-full focus:shadow-accent_green hover:shadow-accent_green hover:shadow-accent-orange"
          type="submit"
          data-cy="closeX"
          title="Войти"
          onClick={onSubmit}
        />
      </div>
    </div>
  );
};
