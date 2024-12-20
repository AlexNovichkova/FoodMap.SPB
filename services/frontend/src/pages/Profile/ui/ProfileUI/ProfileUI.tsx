import { FC, SyntheticEvent } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'src/features/store';
import { PersonContainer } from '../PersonContainer';
import { RestaurantsContainer } from 'src/widgets/RestaurantsContainer';
import { Input } from 'src/shared/ui/Input';
/*import { PasswordInput } from 'src/shared/ui/PasswordInput';*/
import { MainButton } from 'src/shared/ui/MainButton';
import { ProfileMenu } from '../../Profile';
import { PageUIProps } from 'src/entities/projects/models/types';

export type ProfileMenuUIProps = {
  pathname: string;
  handleLogout: () => void;
};

export const ProfileMenuUI: FC<ProfileMenuUIProps> = ({ pathname }) => {
  const user = useSelector((state) => state.user.user); // Получаем объект пользователя
  const likedRestaurants = user?.liked || []; // Используем опциональную цепочку
  const recommendedRestaurants = user?.recommended || []; // Используем опциональную цепочку
  const userName = user?.username || ''; // Используем опциональную цепочку
  const userEmail = user?.email || ''; // Используем опциональную цепочку
  const userImage = user?.image || ''; // Используем опциональную цепочку

  return (
    <>
      <div className="flex flex-col gap-5">
        <NavLink
          to={'/profile'}
          className={({ isActive }) =>
            `flex items-start leading-none text-xl font-bold text-black-600 md:text-2xl lg:text-3xl xl:text-4xl 3xl:text-[2.5rem] focus:outline-none ${
              isActive ? '' : ''
            }`
          }
          end
        >
          Профиль
        </NavLink>
        <PersonContainer
          username={userName}
          email={userEmail}
          image={userImage}
        />
      </div>
      <div>
        <h2 className="flex items-start leading-none text-xl font-bold text-black-600 md:text-2xl lg:text-3xl xl:text-4xl 3xl:text-[2.5rem] ">
          Оцененные заведения
        </h2>
        <div>
          <RestaurantsContainer
            shouldFilterByRating={false}
            restaurants={likedRestaurants}
          />
        </div>
      </div>
      <div>
        <h2 className="flex items-start leading-none text-xl font-bold text-black-600 md:text-2xl lg:text-3xl xl:text-4xl 3xl:text-[2.5rem]">
          Может понравиться
        </h2>
        <div>
          <RestaurantsContainer
            shouldFilterByRating={false}
            restaurants={recommendedRestaurants}
          />
        </div>
      </div>

      <p className="md:mt-10 flex items-start lg:leading-10 text-xl font-bold text-black-600 md:text-2xl lg:text-3xl xl:text-4xl 3xl:text-[2.5rem]">
        {pathname === '/profile'} В этом разделе вы можете изменить свои
        персональные данные
      </p>
    </>
  );
};

export type ProfileUIProps = PageUIProps & {
  formData: {
    username: string;
    email: string;
    image: string;
  };
  isFormChanged: boolean;
  handleLogout: () => void;
  handleCancel: (e: SyntheticEvent) => void;
};

export const ProfileUI: FC<ProfileUIProps> = ({
  isFormChanged,
  handleLogout,
  onSubmit,
  handleCancel,
  onInputChange,
  formData,
  errors,
  generalError,
  onBlur,
}) => (
  <main className={` bg_section_profile m-auto pt-9 pb-12 3xl:pt-12 3xl:pb-16`}>
    <section className="w-[93%] md:w-[90%] m-auto flex flex-col">
      <div className={`flex flex-col gap-14`}>
        <ProfileMenu />
      </div>
      <form
        id="change-user-info"
        className={`mt-8 mb-12 w-[98%] md:w-[70%] lg:w-[55%] xl:w-[40%] self-center`}
        onSubmit={onSubmit}
      >
        <>
          <div className="pb-6">
            <Input
              className="w-full "
              label="Загрузить изображение"
              type="file"
              name={'image'}
              accept="image/png,image/jpeg,image/gif"
              onChange={onInputChange}
              onBlur={onBlur}
              error={!!errors.image}
              errorText={errors.image}
            />
          </div>
          <div className="pb-6">
            <Input
              className="w-full "
              type={'text'}
              name={'username'}
              placeholder={'Имя'}
              label="Имя"
              value={formData.username}
              onChange={onInputChange}
              onBlur={onBlur}
              error={!!errors.username}
              errorText={errors.username}
            />
          </div>
          <div className="pb-6">
            <Input
              className="w-full "
              type={'email'}
              placeholder={'E-mail'}
              name={'email'}
              label="Почта"
              value={formData.email}
              onChange={onInputChange}
              onBlur={onBlur}
              error={!!errors.email}
              errorText={errors.email}
            />
          </div>
          {isFormChanged && (
            <div className=" flex flex-row justify-between">
              <MainButton
                type="button"
                className=""
                title="Отменить"
                onClick={handleCancel}
              />

              <MainButton type="submit" className="" title="Сохранить" />
            </div>
          )}
          {generalError && (
            <p className={` pt-5 text text_type_main-default`}>
              {generalError}
            </p>
          )}
        </>
      </form>
      <MainButton
        title="Выход"
        className={`text text_type_main-medium text_color_inactive pt-4 pb-4 self-center w-[98%] md:w-[70%] lg:w-[55%] xl:w-[40%]`}
        onClick={handleLogout}
      ></MainButton>
    </section>
  </main>
);
