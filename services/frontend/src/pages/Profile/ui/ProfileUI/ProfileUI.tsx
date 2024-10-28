import { FC, ChangeEvent, SyntheticEvent } from 'react';
import { NavLink } from 'react-router-dom';
import { ProfileMenu } from '../../Profile';
import { MainButton } from 'src/shared/ui/MainButton';
import { PersonContainer } from '../PersonContainer';
import { useSelector } from 'src/features/store';
import { RestaurantsContainer } from 'src/widgets/RestaurantsContainer';

export type ProfileMenuUIProps = {
  pathname: string;
  handleLogout: () => void;
};

export const ProfileMenuUI: FC<ProfileMenuUIProps> = ({
  pathname,
  handleLogout
}) => {
  const userName = useSelector((state) => state.user.user.name);
  const userEmail = useSelector((state) => state.user.user.email);
  return (
    <>
      <div className='flex flex-col gap-5'>
        <NavLink
          to={'/profile'}
          className={({ isActive }) =>
            `flex items-start leading-none text-xl font-bold text-black-600 md:text-2xl lg:text-3xl xl:text-4xl ${''} ${isActive ? '' : ''}`
          }
          end
        >
          Профиль
        </NavLink>
        <PersonContainer
          name={userName ? userName : ''}
          email={userEmail ? userEmail : ''}
        />
      </div>
      <div>
        <h2 className='flex items-start leading-none text-xl font-bold text-black-600 md:text-2xl lg:text-3xl xl:text-4xl '>
          Оцененные заведения
        </h2>
        <div>
          <RestaurantsContainer />
        </div>
      </div>
      <div>
        <h2 className='flex items-start leading-none text-xl font-bold text-black-600 md:text-2xl lg:text-3xl xl:text-4xl'>
          Может понравиться
        </h2>
        <div>
          <RestaurantsContainer />
        </div>
      </div>

      <p className=' md:mt-10 flex items-start  lg:leading-10 text-xl font-bold text-black-600 md:text-2xl lg:text-3xl xl:text-4xl'>
        {pathname === '/profile'} В этом разделе вы можете изменить свои
        персональные данные
      </p>
    </>
  );
};

export type ProfileUIProps = {
  formValue: {
    name: string;
    email: string;
    password: string;
  };
  isFormChanged: boolean;
  handleLogout: () => void;
  handleSubmit: (e: SyntheticEvent) => void;
  handleCancel: (e: SyntheticEvent) => void;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  updateUserError?: string;
};

export const ProfileUI: FC<ProfileUIProps> = ({
  formValue,
  isFormChanged,
  updateUserError,
  handleLogout,
  handleSubmit,
  handleCancel,
  handleInputChange
}) => (
  <main className={` bg_section_profile m-auto pt-9 pb-12`}>
    <section className='w-[95%] md:w-[90%] m-auto'>
      <div className={`flex flex-col gap-14`}>
        <ProfileMenu />
      </div>
      <form className={`mt-8 mb-12`} onSubmit={handleSubmit}>
        <>
          <div className='pb-6'>
            <input
              className='w-full outline-black-700 outline outline-1 py-1 px-2 rounded-[8px] text-base lg:text-lg 2xl:text-xl focus:outline-accent_green focus:outline-2 active:outline-accent_green'
              type={'text'}
              onChange={handleInputChange}
              value={formValue.name}
              name={'name'}
              placeholder={'Имя'}
            />
          </div>
          <div className='pb-6'>
            <input
              className='w-full outline-black-700 outline outline-1 py-1 px-2 rounded-[8px] text-base lg:text-lg 2xl:text-xl focus:outline-accent_green focus:outline-2 active:outline-accent_green'
              type={'email'}
              placeholder={'E-mail'}
              onChange={handleInputChange}
              value={formValue.email}
              name={'email'}
            />
          </div>
          <div className='pb-6'>
            <input
              className='w-full outline-black-700 outline outline-1 py-1 px-2 rounded-[8px] text-base lg:text-lg 2xl:text-xl focus:outline-accent_green focus:outline-2 active:outline-accent_green'
              type={'password'}
              placeholder={'Пароль'}
              onChange={handleInputChange}
              value={formValue.password}
              name={'password'}
            />
          </div>
          {isFormChanged && (
            <div className=' flex flex-row justify-between'>
              <MainButton
                type='button'
                className=''
                title='Отменить'
                onClick={handleCancel}
              />

              <MainButton type='submit' className='' title='Сохранить' />
            </div>
          )}
          {updateUserError && (
            <p className={` pt-5 text text_type_main-default`}>
              {updateUserError}
            </p>
          )}
        </>
      </form>
      <MainButton
        title='Выход'
        className={`text text_type_main-medium text_color_inactive pt-4 pb-4 w-full `}
        onClick={handleLogout}
      ></MainButton>
    </section>
  </main>
);
