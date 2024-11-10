import { FC } from 'react';
import { Dispatch, SetStateAction } from 'react';
import { Link } from 'react-router-dom';

import { PageUIProps } from 'src/entities/projects/models/types';
import { Input } from 'src/shared/ui/Input';
import { MainButton } from 'src/shared/ui/MainButton';
import { PasswordInput } from 'src/shared/ui/PasswordInput';

export type ResetPasswordUIProps = Omit<PageUIProps, 'email' | 'setEmail'> & {
  password: string;
  token: string;
  setPassword: Dispatch<SetStateAction<string>>;
  setToken: Dispatch<SetStateAction<string>>;
};

export const ResetPasswordUI: FC<ResetPasswordUIProps> = ({
  errorText,
  password,
  setPassword,
  handleSubmit,
  token,
  setToken
}) => (
  <main className='pt-20 mx-5 md:m-auto md:w-[50%] '>
    <div className={`pt-0 md:pt-3 xl:w-full xl:px-4`}>
      <h3 className='pb-6   2xl:text-3xl text-xl font-bold text-black-600 md:text-2xl lg:text-3xl xl:text-4xl'>
        Восстановление пароля
      </h3>
      <form className={`pb-15 `} name='login' onSubmit={handleSubmit}>
        <div className='pb-6'>
          <PasswordInput
            className='w-full  md:min-w-[40%] outline-black-700 outline outline-1 py-1 px-2 rounded-[8px] text-base lg:text-lg 2xl:text-xl focus:outline-accent_green focus:outline-2 active:outline-accent_green'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            name='password'
            placeholder='Новый пароль'
            label='Пароль'
          />
        </div>
        <div className='pb-6'>
          <Input
            className='w-full  md:min-w-[40%] outline-black-700 outline outline-1 py-1 px-2 rounded-[8px] text-base lg:text-lg 2xl:text-xl focus:outline-accent_green focus:outline-2 active:outline-accent_green'
            type='text'
            placeholder='Введите код из письма'
            onChange={(e) => setToken(e.target.value)}
            value={token}
            name='token'
          />
        </div>
        <div className=' flex items-center min-h-16'>
          <MainButton
            className='  w-full  md:min-w-[40%] focus:shadow-accent_green hover:shadow-accent_green hover:shadow-accent-orange'
            type='submit'
            data-cy='closeX'
            title='Сохранить'
          />
        </div>
        {errorText && (
          <p className={` text text_type_main-default pb-6`}>{errorText}</p>
        )}
      </form>
      <div
        className={`pb-4 pt-6  text text_type_main-default text-base lg:text-lg xl:text-xl 2xl:text-2xl font-normal `}
      >
        Вспомнили пароль?
        <Link
          to='/:login'
          className={`pl-2 text-accent_green outline-none font-medium focus:text-green-400 focus:border-b hover:text-green-400 hover:border-b`}
        >
          Войти
        </Link>
      </div>
    </div>
  </main>
);
