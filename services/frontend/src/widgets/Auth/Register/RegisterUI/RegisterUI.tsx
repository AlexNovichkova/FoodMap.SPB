import { FC, Dispatch, SetStateAction } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PageUIProps } from 'src/entities/projects/models/types';
import { Input } from 'src/shared/ui/Input';
import { MainButton } from 'src/shared/ui/MainButton';
import { PasswordInput } from 'src/shared/ui/PasswordInput';

export type RegisterUIProps = PageUIProps & {
  password: string;
  userName: string;
  setPassword: Dispatch<SetStateAction<string>>;
  setUserName: Dispatch<SetStateAction<string>>;
};

export const RegisterUI: FC<RegisterUIProps> = ({
  errorText,

  email,
  setEmail,
  handleSubmit,
  password,
  setPassword,
  userName,
  setUserName,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const openLoginModal = () => {
    const { pathname, search } = location; // Извлекаем только нужные данные
    navigate('/login', { state: { background: { pathname, search } } });
  };
  return (
    <main className="pt-20 pb-20 mx-5 md:m-auto md:w-[50%] ">
      <div className={`pt-0 md:pt-3  md:w-full lg:px-4 xl:px-5`}>
        <h3 className="pb-6 text-lg text-black-700  font-medium lg:text-xl xl:text-2xl  2xl:text-3xl">
          Регистрация
        </h3>
        <form className={`pb-15 `} name="register" onSubmit={handleSubmit}>
          <>
            <div className="pb-6">
              <input
                className="w-full outline-black-700 outline outline-1 py-1 px-2 rounded-[8px] text-base lg:text-lg 2xl:text-xl focus:outline-accent_green focus:outline-2 active:outline-accent_green"
                type="text"
                placeholder="Имя"
                onChange={(e) => setUserName(e.target.value)}
                value={userName}
                name="name"
              />
            </div>
            <div className="pb-6">
              <Input
                className="w-full outline-black-700 outline outline-1 py-1 px-2 rounded-[8px] text-base lg:text-lg 2xl:text-xl focus:outline-accent_green focus:outline-2 active:outline-accent_green"
                type="email"
                placeholder="E-mail"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                name={'email'}
                error={false}
                errorText=""
              />
            </div>
            <div className="pb-6">
              <PasswordInput
                label="Пароль"
                className="w-full outline-black-700 outline outline-1 py-1 px-2 rounded-[8px] text-base lg:text-lg 2xl:text-xl focus:outline-accent_green focus:outline-2 active:outline-accent_green"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                placeholder="Пароль"
                name="password"
              />
            </div>

            {errorText && (
              <p className={` text text_type_main-default pb-6`}>{errorText}</p>
            )}
          </>
        </form>
        <div
          className={`pb-4 pt-6 text-black-700 text text_type_main-default text-base lg:text-lg xl:text-xl 2xl:text-2xl font-normal  `}
        >
          Уже зарегистрированы?
          <button
            onClick={openLoginModal}
            className={`pl-2 text-accent_green outline-none font-medium focus:text-green-400 focus:border-b hover:text-green-400 hover:border-b`}
          >
            Войти
          </button>
        </div>
        <div className=" flex items-center min-h-16">
          <MainButton
            className=" w-full focus:shadow-accent_green hover:shadow-accent_green hover:shadow-accent-orange"
            type="submit"
            data-cy="closeX"
            title="Зарегистрироваться"
            onClick={handleSubmit}
          />
        </div>
      </div>
    </main>
  );
};
