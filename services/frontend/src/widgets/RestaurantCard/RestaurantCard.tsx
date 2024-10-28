import React from 'react';
import { useSelector } from 'react-redux';
import {
  selectIsLoading,
  selectRestaurants
} from 'src/features/slices/restaurantsSlice';
import { FC } from 'react';
import { LocationIcon } from './ui/LocationIcon';
import { StarIcon } from './ui/StarIcon';
import { MainButton } from 'src/shared/ui/MainButton';
export const RestaurantCard: FC = () => {
  ///const restaurants = useSelector(selectRestaurants);
  ///const isLoading = useSelector(selectIsLoading);

  return (
    <div className=' flex flex-col gap-4'>
      <div className=' w-full h-full md:w-48 md:h-48 lg:w-56 lg:h-56 2xl:w-64 2xl:h-64'>
        <img
          className=' object-cover object-center rounded-[16px] h-full w-full'
          src='https://i.pinimg.com/736x/5d/04/ed/5d04ed8a45ba7d555b9a998daebd2a23.jpg'
          /**src={restaurants.image}*/
        />
      </div>
      <div className=' flex flex-col gap-2'>
        <span className=' text-black-600 text-left font-bold text-base md:text-lg lg:text-xl xl:text-2xl'>
          Cheese Burger
        </span>
        <div className=' text-orange-400 flex flex-row gap-2 items-center '>
          <LocationIcon className='size-6' />
          <span className=' font-bold text-lg text-left md:text-xl lg:text-2xl xl:text-3xl italic font-caveat'>
            Burger Arena
          </span>
        </div>
        <div className=' text-black-600 text-left flex flex-row gap-2 items-center'>
          <StarIcon className='size-5' />
          <span className=' font-bold text-base md:text-lg lg:text-xl xl:text-2xl italic'>
            4.50
          </span>
        </div>
        <MainButton title='Перейти' className=' ' />
      </div>
    </div>
  );
};
