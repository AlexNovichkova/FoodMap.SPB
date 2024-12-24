import { useEffect, useState } from 'react';
import { LoginButton } from './ui/LoginButton';
import { IconCross } from 'src/shared/ui/IconCross';
import { IconBars } from 'src/shared/ui/IconBars';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'src/features/store';
import {
  authenticatedSelector,
  checkUserAuth,
  logoutUser,
} from 'src/features/slices/userSlice';
import { LogOutButton } from './ui/LogOutButton';
import { ProfileIcon } from './ui/ProfileIcon';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isAuthenticated = useSelector(authenticatedSelector);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };
  const handleResize = () => {
    if (window.innerWidth > 640 && isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    dispatch(checkUserAuth());
  }, [dispatch]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isMenuOpen]);
  return (
    <header className={` mx-auto mt-7 pb-7 3xl:mt-9 shadow-sm`}>
      <div className=" md:w-[90%] header_nav_container flex flex-row justify-between items-center relative">
        <div className=" ml-5 md:ml-0 flex flex-row gap-3 items-center">
          <div className=" min-w-9 max-w-11 md:max-w-14 3xl:max-w-16 cursor-pointer">
            <Link
              className="rounded-full outline-none  focus:outline-none focus:shadow-lg focus:shadow-green-400"
              to={'/'}
            >
              <img
                className=" object-cover object-center"
                src="/public/images/logo_burger.png"
                alt="Логотип"
              />
            </Link>
          </div>
          <Link
            to={'/'}
            className={` outline-none  focus:outline-none focus:border-b focus:border-b-accent_green`}
          >
            <div className=" text-accent_orange font-bold text-lg md:text-xl lg:text-3xl 3xl:text-4xl">
              Food<span className=" text-accent_green">Map.</span>SPB
            </div>
          </Link>
        </div>
        <div className="hidden md:flex md:items-center md:gap-8">
          <Link
            className="focus:outline-none focus:border-b focus:border-b-accent_green hover:border-b hover:border-b-accent_green active:border-b-accent_green"
            to={`/`}
          >
            <span className="text-accent_green font-bold text-base lg:text-lg xl:text-xl 2xl:text-2xl 3xl:text-3xl outline-none">
              Главная
            </span>
          </Link>
          <Link
            className="focus:outline-none focus:border-b focus:border-b-accent_green hover:border-b hover:border-b-accent_green active:border-b-accent_green"
            to={`/restaurants`}
          >
            <span className="text-accent_green font-bold text-base lg:text-lg xl:text-xl 2xl:text-2xl 3xl:text-3xl outline-none ">
              Все заведения
            </span>
          </Link>
          <Link
            className=" rounded-full focus:text-green-600 focus:outline-none focus:shadow-lg focus:shadow-green-400"
            to={`/profile`}
          >
            <ProfileIcon
              className={` ${isAuthenticated ? ' block' : `hidden`}`}
            />
          </Link>
          {!isAuthenticated ? (
            <LoginButton className=" text-accent_green  " title="Войти" />
          ) : (
            <LogOutButton
              handleLogout={handleLogout}
              className=" text-accent_green  "
              title="Выйти"
            />
          )}
        </div>
        <div
          className={` mr-5 md:hidden block cursor-pointer `}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            // SVG для закрытого состояния меню
            <IconCross />
          ) : (
            // SVG для открытого состояния меню
            <IconBars />
          )}
        </div>
        <div
          className={` absolute z-30 top-14 md:hidden shadow-xl bg-white transition-all duration-300 overflow-hidden w-full flex flex-col items-center justify-center gap-6
           h-0 ${isMenuOpen && 'h-64'}`}
        >
          <Link
            className="focus:outline-none focus:border-b focus:border-b-accent_green outline-none w-fit hover:border-b hover:border-b-accent_green"
            to={`/`}
          >
            <span className="text-accent_green font-bold text-base lg:text-lg xl:text-xl 2xl:text-2xl outline-none ">
              Главная
            </span>
          </Link>
          <Link
            to={`/restaurants`}
            className="focus:outline-none focus:border-b focus:border-b-accent_green outline-none w-fit hover:border-b hover:border-b-accent_green"
          >
            <span className="text-accent_green font-bold text-base lg:text-lg xl:text-xl 2xl:text-2xl outline-none">
              Все заведения
            </span>
          </Link>
          <Link
            className=" rounded-full focus:text-green-600 focus:outline-none focus:shadow-lg focus:shadow-green-400"
            to={`/profile`}
          >
            <ProfileIcon
              className={` ${isAuthenticated ? ' block' : `hidden`}`}
            />
          </Link>
          {!isAuthenticated ? (
            <LoginButton className=" text-accent_green  " title="Войти" />
          ) : (
            <LogOutButton
              handleLogout={handleLogout}
              className=" text-accent_green  "
              title="Выйти"
            />
          )}
        </div>
      </div>
    </header>
  );
};
