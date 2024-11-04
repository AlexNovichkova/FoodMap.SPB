import { FC, Dispatch, SetStateAction, SyntheticEvent } from 'react';
import { Link } from 'react-router-dom';
import { PageUIProps } from 'src/entities/projects/models/types';
import { MainButton } from 'src/shared/ui/MainButton';

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
  setPassword
}) => (
  <div className={`pt-0 md:pt-3 xl:w-full xl:px-4 `}>
    <h3 className='pb-6 text-lg  font-medium lg:text-xl xl:text-2xl  2xl:text-3xl'>
      Вход
    </h3>
    <form className={`pb-15 `} name='login' onSubmit={handleSubmit}>
      <>
        <div className='pb-6'>
          <input
            className='w-full outline-black-700 outline outline-1 py-1 px-2 rounded-[8px] text-base lg:text-lg 2xl:text-xl focus:outline-accent_green focus:outline-2 active:outline-accent_green'
            type='email'
            placeholder='E-mail'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            name='email'
          />
        </div>
        <div className='pb-6'>
          <input
            className='w-full outline-black-700 outline outline-1 py-1 px-2 rounded-[8px] text-base lg:text-lg 2xl:text-xl focus:outline-accent_green focus:outline-2 active:outline-accent_green'
            placeholder='Пароль'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            name='password'
          />
        </div>
        {errorText && (
          <p className={` text text_type_main-default pb-6`}>{errorText}</p>
        )}
      </>
    </form>
    <div
      className={`pb-4 pt-6  text text_type_main-default text-base lg:text-lg xl:text-xl 2xl:text-2xl font-normal  `}
    >
      Вы - новый пользователь?
      <Link
        to='/register'
        className={`pl-2 text-accent_green outline-none font-medium focus:text-green-400 focus:border-b hover:text-green-400 hover:border-b`}
      >
        Зарегистрироваться
      </Link>
    </div>
    <div
      className={` text text_type_main-default pb-6 text-base lg:text-lg xl:text-xl 2xl:text-2xl font-normal `}
    >
      Забыли пароль?
      <Link
        to={'/forgot-password'}
        className={`pl-2 text-accent_green outline-none font-medium focus:text-green-400 focus:border-b hover:text-green-400 hover:border-b`}
      >
        Восстановить пароль
      </Link>
    </div>
    <div className=' flex items-center min-h-16'>
      <MainButton
        className=' w-full focus:shadow-accent_green hover:shadow-accent_green hover:shadow-accent-orange'
        type='submit'
        data-cy='closeX'
        title='Войти'
      />
    </div>
  </div>
);
