import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'src/features/store';
import { LocationIcon } from 'src/widgets/RestaurantCard/ui/LocationIcon';
import { StarIcon } from 'src/widgets/RestaurantCard/ui/StarIcon';
import { FingerIcon } from './ui/FingerIcon';
import { HeartIcon } from './ui/HeartIcon';
export const RestaurantPage = () => {
  const { id } = useParams(); // Получаем id из URL
  const restaurants = useSelector((state) => state.restaurants.restaurants);
  const restaurant = restaurants.find(
    (restaurant) => restaurant.id === Number(id)
  ); // Находим ресторан по id

  if (!restaurant) {
    return <div>Ресторан не найден.</div>;
  }

  const [isLiked, setIsLiked] = useState(false); // Состояние для отслеживания "лайка"
  const toggleIsLiked = () => {
    setIsLiked((prev) => !prev); // Переключаем состояние "лайка"
  };

  return (
    <section className='bg_restaurant'>
      <div className='pt-20 pb-16 mx-5 md:m-auto md:w-[90%]'>
        <h2 className=' text-green-600 mb-10 text-left font-bold text-lg md:text-2xl lg:text-3xl xl:text-4xl break-words'>
          {restaurant.name}
        </h2>
        <div className='flex flex-col gap-4 md:flex-row md:gap-[5%] lg:gap-16'>
          <div className=' w-full h-full md:w-64 md:min-w-56 md:h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96'>
            <img
              className=' object-cover object-center rounded-[16px] h-full w-full shadow'
              src={restaurant.image}
              alt={restaurant.name}
            />
          </div>
          <div className=' flex flex-col gap-3 md:max-w-[50%] xl:max-w-[60%]'>
            <div className=' text-black-600 text-left flex flex-row gap-2 items-center'>
              <span className=' font-medium text-base md:text-xl lg:text-2xl xl:text-3xl italic break-words'>
                {restaurant.description}
              </span>
            </div>
            <div className=' text-green-600 text-left flex flex-row gap-2 items-center'>
              <span className=' flex gap-1 font-semibold text-base md:text-xl lg:text-2xl xl:text-3xl break-words items-center'>
                Кухня:
                <span className='font-medium text-black-600 italic font-caveat text-xl md:text-2xl lg:text-3xl xl:text-4xl'>
                  армянская, домашняя
                </span>
              </span>
            </div>
            <div className=' text-accent_orange text-left flex flex-row gap-2 items-center'>
              <span className='flex gap-1 font-semibold text-base md:text-xl lg:text-2xl xl:text-3xl break-words items-center'>
                Ценовой сегмент:
                <span className='font-medium text-black-600 italic font-caveat text-xl md:text-2xl lg:text-3xl xl:text-4xl'>
                  {restaurant.price}
                </span>
              </span>
            </div>
            <div className=' text-green-600 flex flex-row gap-2 items-center '>
              <LocationIcon className='size-6' />
              <span className=' font-bold text-lg text-left md:text-2xl lg:text-3xl xl:text-4xl font-caveat break-words'>
                {restaurant.address}
              </span>
            </div>
            <div className=' '>
              <div className=' text-accent_orange text-left flex flex-row gap-2 items-center'>
                <StarIcon className='size-5 ' />
                <span className=' font-bold text-lg md:text-xl lg:text-2xl xl:text-3xl italic'>
                  {restaurant.rating}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=' mx-5 pb-20 md:m-auto md:w-[90%] flex gap-2 lg:gap-5 flex-col lg:items-end lg:flex-row'>
        <span className='font-medium text-green-600 text-base md:text-lg lg:text-xl xl:text-2xl  break-words'>
          Понравилось заведение?<br></br>
          <span className=' italic text-black-600'>
            {' '}
            Тогда жми сюда, чтобы мы знали о твоих предпочтениях
          </span>
        </span>
        <div className=' flex flex-row gap-2 lg:items-end'>
          <FingerIcon className='rotate-90 size-9 lg:size-10 xl:size-12 fill-green-600 transition-all' />
          <button className='card__icon-button' onClick={toggleIsLiked}>
            <HeartIcon className={isLiked ? 'is-liked' : ''} />
          </button>
        </div>
      </div>
    </section>
  );
};
