import React from 'react';
import { ArrowButton } from 'src/shared/ui/ArrowButton';
import { RestaurantCard } from 'src/widgets/RestaurantCard';

export const HighRateSection = () => {
  return (
    <section className=' '>
      <div className=' pt-20 mx-5 md:m-auto md:w-[90%]'>
        <div className=' flex flex-col gap-6 justify-between md:gap-0 md:flex-row'>
          <h2 className=' flex items-start  text-xl font-bold text-black-600 md:text-2xl lg:text-3xl xl:text-4xl'>
            Заведения с высоким рейтингом
          </h2>
        </div>
        <div className=' flex flex-row md:justify-between w-full'>
          <div className=' hidden flex-row gap-6 items-center md:flex'>
            <ArrowButton className=' bg-accent_green shadow-orange-400 rotate-180 ' />
          </div>
          <div className=' mt-16 mb-16 flex flex-col lg:flex-row'>
            <RestaurantCard />
          </div>
          <div className=' hidden flex-row gap-6 items-center md:flex'>
            <ArrowButton className=' bg-accent_green shadow-orange-400' />
          </div>
        </div>
        <div className='flex justify-between md:hidden'>
          <div className=' md:hidden flex-row gap-6 items-center flex'>
            <ArrowButton className=' bg-accent_green shadow-orange-400 rotate-180' />
          </div>
          <div className=' md:hidden flex-row gap-6 items-center flex'>
            <ArrowButton className=' bg-accent_green shadow-orange-400' />
          </div>
        </div>
      </div>
    </section>
  );
};
