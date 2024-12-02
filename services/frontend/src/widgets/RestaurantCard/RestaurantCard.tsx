import { FC } from 'react';
import { LocationIcon } from './ui/LocationIcon';
import { StarIcon } from './ui/StarIcon';
import { MainButton } from 'src/shared/ui/MainButton';
import {
  TNewRestaurant,
  TRestaurant,
} from 'src/entities/projects/models/types';
import { Link } from 'react-router-dom';
export const RestaurantCard: FC<TRestaurant> = ({
  id,
  name,
  photo_links,
  rating,
  address,
}) => (
  <div className=" flex flex-col  gap-4 w-[90%] self-center sm:w-[45%] md:w-48 xl:w-56 2xl:w-64">
    <div className="flex flex-col gap-2 lg:gap-4">
      <div className=" w-full h-full md:w-48 md:h-48 xl:w-56 xl:h-56 2xl:w-64 2xl:h-64 ">
        <img
          className=" object-cover object-center rounded-[16px] h-full w-full"
          src={photo_links}
          alt={name}
        />
      </div>
      <div className=" flex flex-col gap-2 lg:gap-5">
        <span className=" text-black-600 text-left w-full font-bold text-base md:text-lg md:leading-none lg:text-xl lg:leading-none xl:text-2xl xl:leading-none  break-words h-16 flex items-center line-clamp-2 leading-none">
          {name}
        </span>
        <div className=" text-orange-400 flex flex-row gap-2 items-center h-16">
          <LocationIcon className="size-6" />
          <span className=" font-bold text-base w-full text-left md:text-lg lg:text-xl xl:text-2xl italic font-caveat break-words line-clamp-2">
            {address}
          </span>
        </div>
        <div className=" text-black-600 text-left flex flex-row gap-2 items-center">
          <StarIcon className="size-5" />
          <span className=" font-bold text-base md:text-lg lg:text-xl xl:text-2xl italic ">
            {rating}
          </span>
        </div>
      </div>
    </div>
    <Link to={`/restaurants/${id}`} className={`outline-none`}>
      <MainButton className="w-full mt-2" title="Перейти" />
    </Link>
  </div>
);
