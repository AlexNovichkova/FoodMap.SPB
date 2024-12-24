import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PageUIProps } from 'src/entities/projects/models/types';
import { Input } from 'src/shared/ui/Input';
import { MainButton } from 'src/shared/ui/MainButton';
import { PasswordInput } from 'src/shared/ui/PasswordInput';

export type RegisterUIProps = PageUIProps & {
  formData: { username: string; email: string; password: string };
};

export const RegisterUI: FC<RegisterUIProps> = ({
  formData,
  errors,
  generalError,
  onInputChange,
  onBlur,
  onSubmit,
  isFormValid,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const openLoginModal = () => {
    const { pathname, search } = location; // Извлекаем только нужные данные
    navigate('/login', { state: { background: { pathname, search } } });
  };
  return (
    <main className="pt-20 pb-20 mx-5 md:m-auto md:w-[50%] 3xl:w-[40%]">
      <div className={`pt-0 md:pt-3  md:w-full lg:px-4 xl:px-5`}>
        <h3 className="pb-6 text-lg text-black-700  font-medium lg:text-xl xl:text-2xl  2xl:text-3xl 3xl:text-4xl">
          Регистрация
        </h3>
        <form className={`pb-15 `} name="register" onSubmit={onSubmit}>
          <>
            <div className="pb-6">
              <Input
                label="Имя"
                className="w-full "
                type="text"
                placeholder="Имя"
                onChange={onInputChange}
                name={'username'}
                value={formData.username}
                error={!!errors.username}
                errorText={errors.username}
                tooltip="Введите имя не менее 2 символов"
              />
            </div>
            <div className="pb-6">
              <Input
                label="Почта"
                className="w-full "
                type="email"
                placeholder="E-mail"
                onChange={onInputChange}
                name={'email'}
                value={formData.email}
                error={!!errors.email}
                errorText={errors.email}
                tooltip="Введите email в формате example@domain.com"
              />
            </div>
            <div className="pb-6">
              <PasswordInput
                label="Пароль"
                className="w-full"
                placeholder="Пароль"
                name="password"
                onChange={onInputChange}
                onBlur={onBlur}
                value={formData.password}
                error={!!errors.password}
                errorText={errors.password}
                tooltip="Введите пароль не менее 6 символов"
              />
            </div>

            {generalError && (
              <p
                className={
                  ' text-base lg:text-lg xl:text-xl 2xl:text-2xl text-accent_orange font-bold'
                }
              >
                {generalError}
              </p>
            )}
          </>
        </form>
        <div
          className={`pb-4 pt-6 text-black-700 text text_type_main-default text-base lg:text-lg xl:text-xl 2xl:text-2xl 3xl:text-3xl font-normal  `}
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
            className={` w-full   ${
              !isFormValid
                ? 'opacity-50 cursor-not-allowed hover:shadow-accent-orange'
                : 'focus:shadow-accent_green hover:shadow-accent_green hover:shadow-accent-orange'
            } `}
            type="submit"
            data-cy="closeX"
            title="Зарегистрироваться"
            onClick={onSubmit}
            disabled={!isFormValid}
          />
        </div>
      </div>
    </main>
  );
};
