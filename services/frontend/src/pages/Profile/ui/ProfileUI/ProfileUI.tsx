import { FC, ChangeEvent, SyntheticEvent } from 'react';
import { NavLink } from 'react-router-dom';
import { ProfileMenu } from '../../Profile';
import { MainButton } from 'src/shared/ui/MainButton';
import { PersonContainer } from '../PersonContainer';
import { useSelector } from 'src/features/store';
import { RestaurantsContainer } from 'src/widgets/RestaurantsContainer';
import { Input } from 'src/shared/ui/Input';
import { PasswordInput } from 'src/shared/ui/PasswordInput';

export type ProfileMenuUIProps = {
  pathname: string;
  handleLogout: () => void;
};

export const ProfileMenuUI: FC<ProfileMenuUIProps> = ({
  pathname,
  handleLogout
}) => {
  const likedRestaurants = useSelector((state) => state.user.user.liked);
  const recommendedRestaurants = useSelector(
    (state) => state.user.user.recommended
  );
  const userName = useSelector((state) => state.user.user.name);
  const userEmail = useSelector((state) => state.user.user.email);
  const userImage = useSelector((state) => state.user.user.image);
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
          image={userImage ? userImage : ''}
        />
      </div>
      <div>
        <h2 className='flex items-start leading-none text-xl font-bold text-black-600 md:text-2xl lg:text-3xl xl:text-4xl '>
          Оцененные заведения
        </h2>
        <div>
          <RestaurantsContainer
            shouldFilterByRating={false}
            restaurants={likedRestaurants ? likedRestaurants : []}
          />
        </div>
      </div>
      <div>
        <h2 className='flex items-start leading-none text-xl font-bold text-black-600 md:text-2xl lg:text-3xl xl:text-4xl'>
          Может понравиться
        </h2>
        <div>
          <RestaurantsContainer
            shouldFilterByRating={false}
            restaurants={recommendedRestaurants ? recommendedRestaurants : []}
          />
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
    <section className='w-[93%] md:w-[90%] m-auto flex flex-col'>
      <div className={`flex flex-col gap-14`}>
        <ProfileMenu />
      </div>
      <form
        id='change-user-info'
        className={`mt-8 mb-12 w-[98%] md:w-[70%] lg:w-[55%] xl:w-[40%] self-center`}
        onSubmit={handleSubmit}
      >
        <>
          <div className='pb-6'>
            <Input
              className='w-full outline-black-700 outline outline-1 py-1 px-2 rounded-[8px] text-base lg:text-lg 2xl:text-xl focus:outline-accent_green focus:outline-2 active:outline-accent_green'
              label='Загрузить изображение'
              type='file'
              name={'file'}
              onChange={handleInputChange}
              accept='image/*'
            />
          </div>
          <div className='pb-6'>
            <Input
              className='w-full outline-black-700 outline outline-1 py-1 px-2 rounded-[8px] text-base lg:text-lg 2xl:text-xl focus:outline-accent_green focus:outline-2 active:outline-accent_green'
              type={'text'}
              onChange={handleInputChange}
              value={formValue.name}
              name={'name'}
              placeholder={'Имя'}
              label='Имя'
              error={false}
              errorText=''
            />
          </div>
          <div className='pb-6'>
            <Input
              className='w-full outline-black-700 outline outline-1 py-1 px-2 rounded-[8px] text-base lg:text-lg 2xl:text-xl focus:outline-accent_green focus:outline-2 active:outline-accent_green'
              type={'email'}
              placeholder={'E-mail'}
              onChange={handleInputChange}
              value={formValue.email}
              name={'email'}
              label='Почта'
              error={false}
              errorText=''
            />
          </div>
          <div className='pb-6'>
            <PasswordInput
              className='w-full outline-black-700 outline outline-1 py-1 px-2 rounded-[8px] text-base lg:text-lg 2xl:text-xl focus:outline-accent_green focus:outline-2 active:outline-accent_green'
              type={'password'}
              placeholder={'Пароль'}
              onChange={handleInputChange}
              value={formValue.password}
              name={'password'}
              label='Пароль'
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
        className={`text text_type_main-medium text_color_inactive pt-4 pb-4 self-center w-[98%] md:w-[70%] lg:w-[55%] xl:w-[40%]`}
        onClick={handleLogout}
      ></MainButton>
    </section>
  </main>
);
