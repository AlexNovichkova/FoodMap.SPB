import React, { useEffect, useState } from 'react';
import { MainButton } from 'src/shared/ui/MainButton';
import { LoginButton } from './ui/LoginButton';
import { IconCross } from 'src/shared/ui/IconCross';
import { IconBars } from 'src/shared/ui/IconBars';

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
    <header className={` mx-auto mt-7`}>
      <div className=' md:w-[90%] header_nav_container flex flex-row justify-between items-center relative'>
        <div className=' ml-7 md:ml-0 flex flex-row gap-3 items-center'>
          <div className=' min-w-9 max-w-11 md:max-w-14'>
            <img
              className=' object-cover object-center'
              src='/public/images/logo_burger.png'
              alt='Логотип'
            />
          </div>
          <div className=' text-accent_orange font-bold text-lg md:text-xl lg:text-3xl'>
            Food<span className=' text-accent_green'>Map.</span>SPB
          </div>
        </div>
        <div className='hidden md:flex'>
          <LoginButton className=' text-accent_green ' title='Войти' />
        </div>
        <div
          className={` mr-7 md:hidden block cursor-pointer `}
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
          className={` absolute z-30 top-14 md:hidden bg-white transition-all duration-300 overflow-hidden w-full flex flex-col items-center justify-around
           h-0 ${isMenuOpen && 'h-52'}`}
        >
          <LoginButton className=' text-accent_green w-[80%]' title='Войти' />
        </div>
      </div>
      <div className=' bg-orange-400 mt-5 pb-36 pt-36 overflow-hidden z-1'>
        <div className=' header_heading_container flex flex-row gap-20 relative '>
          <div className='flex flex-col gap-4 justify-center lg:w-[60%] lg:max-w-4xl 2xl:w-[70%] z-20'>
            <h1 className=' text-3xl header_heading text-white font-bold leading-none lg:leading-tight'>
              Не знаешь где вкусно поесть в Питере?
            </h1>
            <p className=' header_paragraph text-black-600 font-caveat text-xl lg:text-4xl font-normal leading-none'>
              В несколько кликов найди заведение, которое придется тебе по душе
            </p>
            <MainButton title=' Найти заведение' className=' md:w-fit' />
          </div>
          <div className=' z-10 max-w-80  top-[100%] md:top-[60%] md:max-w-md lg:max-w-lg lg:max-h-full xl:max-w-xl absolute right-0'>
            <img
              className=' rounded-full object-cover bg_image_meal'
              src='/public/images/meal_header.png'
              alt='вкусное блюдо'
            />
          </div>
        </div>
      </div>
    </header>
  );
};
