import { FC } from 'react';
import { LocationIcon } from './ui/LocationIcon';
import { StarIcon } from './ui/StarIcon';
import { MainButton } from 'src/shared/ui/MainButton';
import { TRestaurant } from 'src/entities/projects/models/types';
import { Link } from 'react-router-dom';
export const RestaurantCard: FC<TRestaurant> = ({
  id,
  name,
  photo_links,
  rating,
  address,
}) => (
  <div className=" flex flex-col  gap-4 w-[90%] self-center sm:w-[45%] md:w-48 xl:w-56 2xl:w-64">
    <div className="flex flex-col gap-2 lg:gap-4 3xl:gap-5">
      <div className=" w-full aspect-square md:w-48 md:h-48 xl:w-56 xl:h-56 2xl:w-64 2xl:h-64 ">
        <img
          className=" object-cover object-center rounded-[16px] h-full w-full aspect-square"
          src={
            photo_links ||
            'https://bestkanc.ru/wa-data/public/shop/products/05/33/23305/images/47805/47805.970.jpeg'
          }
          alt={name}
        />
      </div>
      <div className=" flex flex-col gap-2 ">
        <span className="text-black-600 text-left font-bold text-base md:text-lg lg:text-xl xl:text-2xl 3xl:text-3xl break-words line-clamp-2 min-h-14 md:min-h-16 xl:min-h-[4.5rem] ">
          {name}
        </span>
        <div className=" text-orange-400 flex flex-row gap-2 md:items-center md:h-16 3xl:h-20">
          <LocationIcon className="size-6" />
          <span className=" font-bold text-lg w-full text-left md:text-lg lg:text-xl xl:text-2xl 3xl:text-3xl italic font-caveat break-words min-h-14 line-clamp-2">
            {address}
          </span>
        </div>
        <div className=" text-black-600 text-left flex flex-row gap-2 items-center">
          <StarIcon className="size-5" />
          <span className=" font-bold text-base md:text-lg lg:text-xl xl:text-2xl 3xl:text-3xl italic ">
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
