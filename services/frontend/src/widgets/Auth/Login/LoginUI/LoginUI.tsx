import { FC, Dispatch, SetStateAction } from 'react';
import { Link } from 'react-router-dom';
import { PageUIProps } from 'src/entities/projects/models/types';

import { Input } from 'src/shared/ui/Input';
import { MainButton } from 'src/shared/ui/MainButton';
import { PasswordInput } from 'src/shared/ui/PasswordInput';

export type LoginUIProps = PageUIProps & {
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
};

export const LoginUI: FC<LoginUIProps> = ({
  email,
  setEmail,
  errorText,
  handleSubmit,
  password,
  setPassword,
  emailError,
  passwordError,
  handleEmailChange,
  handlePasswordChange,
}) => {
  return (
    <div className={`pt-0 md:pt-3 xl:w-full xl:px-4 `}>
      <h3 className="pb-6 text-lg text-black-700   font-medium lg:text-xl xl:text-2xl  2xl:text-3xl">
        Вход
      </h3>
      <form className={`pb-15 `} name="login" onSubmit={handleSubmit}>
        <>
          <div className="pb-6">
            <Input
              className="w-full "
              type="email"
              placeholder="E-mail"
              onChange={(e) => setEmail(e.target.value)}
              handleEmailChange={handleEmailChange}
              value={email}
              name="email"
              error={emailError}
              errorText={emailError ? 'Введите корректный email' : ''}
            />
          </div>
          <div className="pb-6">
            <PasswordInput
              className={'w-full '}
              placeholder="Пароль"
              onChange={(e) => setPassword(e.target.value)}
              handlePasswordChange={handlePasswordChange}
              value={password}
              name="password"
              label="Пароль"
              type="password"
              required
              error={passwordError}
              errorText={
                passwordError ? 'Пароль должен быть не менее 6 символов' : ''
              }
            />
          </div>
          {errorText && (
            <p className=" text-base lg:text-lg xl:text-xl 2xl:text-2xl text-accent_orange font-bold">
              {errorText ? errorText : ''}
            </p>
          )}
        </>
      </form>
      <div
        className={`pb-4 pt-6 text-black-700   text text_type_main-default text-base lg:text-lg xl:text-xl 2xl:text-2xl font-normal  `}
      >
        Вы - новый пользователь?
        <Link
          to="/register"
          className={`pl-2 text-accent_green outline-none font-medium focus:text-green-400 focus:border-b hover:text-green-400 hover:border-b`}
        >
          Зарегистрироваться
        </Link>
      </div>
      <div
        className={` text text-black-700  text_type_main-default pb-6 text-base lg:text-lg xl:text-xl 2xl:text-2xl font-normal `}
      >
        Забыли пароль?
        <Link
          to={'/forgot-password'}
          className={`pl-2 text-accent_green outline-none font-medium focus:text-green-400 focus:border-b hover:text-green-400 hover:border-b`}
        >
          Восстановить пароль
        </Link>
      </div>
      <div className=" flex items-center min-h-16">
        <MainButton
          className=" w-full focus:shadow-accent_green hover:shadow-accent_green hover:shadow-accent-orange"
          type="submit"
          data-cy="closeX"
          title="Войти"
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};
