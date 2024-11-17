import { useEffect, useState } from 'react';
import { LoginButton } from './ui/LoginButton';
import { IconCross } from 'src/shared/ui/IconCross';
import { IconBars } from 'src/shared/ui/IconBars';
import { Link } from 'react-router-dom';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleResize = () => {
    if (window.innerWidth > 640 && isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isMenuOpen]);
  return (
    <header className={` mx-auto mt-7 pb-7 shadow-sm`}>
      <div className=" md:w-[90%] header_nav_container flex flex-row justify-between items-center relative">
        <div className=" ml-5 md:ml-0 flex flex-row gap-3 items-center">
          <div className=" min-w-9 max-w-11 md:max-w-14 cursor-pointer">
            <Link to={'/'} className={``}>
              <img
                className=" object-cover object-center"
                src="/public/images/logo_burger.png"
                alt="Логотип"
              />
            </Link>
          </div>
          <Link to={'/'} className={``}>
            <div className=" text-accent_orange font-bold text-lg md:text-xl lg:text-3xl">
              Food<span className=" text-accent_green">Map.</span>SPB
            </div>
          </Link>
        </div>
        <div className="hidden md:flex md:items-center md:gap-8">
          <Link to={`/`}>
            <span className="text-accent_green font-bold text-base lg:text-lg xl:text-xl 2xl:text-2xl outline-none hover:border-b hover:border-b-accent_green">
              Главная
            </span>
          </Link>
          <Link to={`/restaurants`}>
            <span className="text-accent_green font-bold text-base lg:text-lg xl:text-xl 2xl:text-2xl outline-none hover:border-b hover:border-b-accent_green">
              Все заведения
            </span>
          </Link>
          <LoginButton className=" text-accent_green  " title="Войти" />
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
          className={` absolute z-30 top-14 md:hidden bg-white transition-all duration-300 overflow-hidden w-full flex flex-col items-center justify-center gap-6
           h-0 ${isMenuOpen && 'h-52'}`}
        >
          <Link to={`/`} className={`outline-none w-fit`}>
            <span className="text-accent_green font-bold text-base lg:text-lg xl:text-xl 2xl:text-2xl outline-none hover:border-b hover:border-b-accent_green ">
              Главная
            </span>
          </Link>
          <Link to={`/restaurants`} className={`outline-none w-fit`}>
            <span className="text-accent_green font-bold text-base lg:text-lg xl:text-xl 2xl:text-2xl outline-none hover:border-b hover:border-b-accent_green">
              Все заведения
            </span>
          </Link>
          <LoginButton className=" text-accent_green w-[80%]" title="Войти" />
        </div>
      </div>
    </header>
  );
};
