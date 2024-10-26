import React from 'react';
import { MainButton } from 'src/shared/ui/MainButton';

export const HeadingSection = () => {
  return (
    <section className=' bg-orange-400  pb-36 pt-36 overflow-hidden z-1'>
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
    </section>
  );
};
