import React from 'react';
import { ArrowButton } from 'src/shared/ui/ArrowButton';
import { RestaurantCard } from '../RestaurantCard';

export const RestaurantsContainer = () => {
  return (
    <>
      <div className=' flex flex-row md:justify-between w-full'>
        <div className=' hidden flex-row gap-6 items-center md:flex'>
          <ArrowButton className=' bg-accent_green shadow-orange-400 rotate-180 ' />
        </div>
        <div className='mb-5 mt-16 md:mb-16 flex flex-col lg:flex-row'>
          <RestaurantCard />
        </div>
        <div className=' hidden flex-row gap-6 items-center md:flex'>
          <ArrowButton className=' bg-accent_green shadow-orange-400' />
        </div>
      </div>
      <div className='mb-16 flex justify-between md:hidden '>
        <div className=' md:hidden flex-row gap-6 items-center flex'>
          <ArrowButton className=' bg-accent_green shadow-orange-400 rotate-180' />
        </div>
        <div className=' md:hidden flex-row gap-6 items-center flex'>
          <ArrowButton className=' bg-accent_green shadow-orange-400' />
        </div>
      </div>
    </>
  );
};
