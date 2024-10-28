import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'src/features/store';
import { LocationIcon } from 'src/widgets/RestaurantCard/ui/LocationIcon';
import { StarIcon } from 'src/widgets/RestaurantCard/ui/StarIcon';
export const RestaurantPage = () => {
  const { id } = useParams(); // Получаем id из URL
  const restaurants = useSelector((state) => state.restaurants.restaurants);
  const restaurant = restaurants.find(
    (restaurant) => restaurant.id === Number(id)
  ); // Находим ресторан по id

  if (!restaurant) {
    return <div>Ресторан не найден.</div>;
  }

  return (
    <section className='bg_restaurant'>
      <div className='pt-20 pb-20 mx-5 md:m-auto md:w-[90%]'>
        <h2 className=' text-black-600 mb-8 text-left font-bold text-lg md:text-2xl lg:text-3xl xl:text-4xl break-words'>
          {restaurant.name}
        </h2>
        <div className='flex flex-col gap-4 md:flex-row md:gap-[5%] lg:gap-16'>
          <div className=' w-full h-full md:w-64 md:min-w-56 md:h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96'>
            <img
              className=' object-cover object-center rounded-[16px] h-full w-full'
              src={restaurant.image}
              alt={restaurant.name}
            />
          </div>
          <div className=' flex flex-col gap-3 md:max-w-[50%]'>
            <div className=' text-black-600 text-left flex flex-row gap-2 items-center'>
              <span className=' font-medium text-base md:text-xl lg:text-2xl xl:text-3xl italic break-words'>
                {restaurant.description}
              </span>
            </div>
            <div className=' text-orange-400 text-left flex flex-row gap-2 items-center'>
              <span className=' flex gap-1 font-semibold text-base md:text-xl lg:text-2xl xl:text-3xl break-words items-center'>
                Кухня:
                <span className='font-medium text-black-600 italic font-caveat text-xl md:text-2xl lg:text-3xl xl:text-4xl'>
                  армянская, домашняя
                </span>
              </span>
            </div>
            <div className=' text-orange-400 text-left flex flex-row gap-2 items-center'>
              <span className='flex gap-1 font-semibold text-base md:text-xl lg:text-2xl xl:text-3xl break-words items-center'>
                Ценовой сегмент:
                <span className='font-medium text-black-600 italic font-caveat text-xl md:text-2xl lg:text-3xl xl:text-4xl'>
                  {restaurant.price}
                </span>
              </span>
            </div>
            <div className=' text-orange-400 flex flex-row gap-2 items-center '>
              <LocationIcon className='size-6' />
              <span className=' font-bold text-lg text-left md:text-2xl lg:text-3xl xl:text-4xl font-caveat break-words'>
                {restaurant.address}
              </span>
            </div>
            <div className=' '>
              <div className=' text-orange-400 text-left flex flex-row gap-2 items-center'>
                <StarIcon className='size-5 ' />
                <span className=' font-bold text-lg md:text-xl lg:text-2xl xl:text-3xl italic'>
                  {restaurant.rating}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
