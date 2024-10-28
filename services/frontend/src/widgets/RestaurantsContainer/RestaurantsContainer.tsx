import React, { FC, useEffect, useState } from 'react';
import { ArrowButton } from 'src/shared/ui/ArrowButton';
import { RestaurantCard } from '../RestaurantCard';
import { useDispatch, useSelector } from 'src/features/store';
import {
  selectIsLoading,
  selectRestaurants
} from 'src/features/slices/restaurantsSlice';
import { testRestaurants } from 'src/app/testData';

export const RestaurantsContainer: FC<{
  shouldFilterByRating: boolean;
}> = ({ shouldFilterByRating }) => {
  const dispatch = useDispatch();
  const restaurants = useSelector((state) => state.restaurants.restaurants);
  const isLoading = useSelector(selectIsLoading);
  const [currentIndex, setCurrentIndex] = useState(0); // Индекс текущей карточки
  const [itemsPerPage, setItemsPerPage] = useState(1); // Начальное значение

  // Функция для обновления количества карточек на странице
  const updateItemsPerPage = () => {
    if (window.innerWidth < 768) {
      setItemsPerPage(1);
    } else if (window.innerWidth < 900) {
      setItemsPerPage(2);
    } else if (window.innerWidth < 1400) {
      setItemsPerPage(3);
    } else {
      setItemsPerPage(4);
    }
  };

  useEffect(() => {
    // Устанавливаем начальное значение
    updateItemsPerPage();

    // Добавляем обработчик события изменения размера окна
    window.addEventListener('resize', updateItemsPerPage);

    // Убираем обработчик при размонтировании
    return () => {
      window.removeEventListener('resize', updateItemsPerPage);
    };
  }, []);
  useEffect(() => {
    // Вместо вызова API, используем тестовые данные
    dispatch({
      type: 'restaurants/getAllRestaurants/fulfilled',
      payload: testRestaurants
    });
  }, [dispatch]);
  const filteredRestaurants = shouldFilterByRating
    ? restaurants.filter((restaurant) => restaurant.rating > 4.7)
    : restaurants;

  const handleNext = () => {
    if (currentIndex + itemsPerPage < filteredRestaurants.length) {
      setCurrentIndex(currentIndex + itemsPerPage);
    } else {
      setCurrentIndex(currentIndex); // Если нельзя пролистнуть
    }
  };

  const handlePrev = () => {
    if (currentIndex - itemsPerPage >= 0) {
      setCurrentIndex(currentIndex - itemsPerPage);
    } else {
      setCurrentIndex(currentIndex); // Если нельзя пролистнуть
    }
  };

  if (filteredRestaurants.length === 0) {
    return <div>No restaurants found.</div>; // Ошибка или пустой список
  }

  return (
    <>
      <div className=' flex flex-row justify-center md:justify-between w-full'>
        <div className=' hidden flex-row gap-6 items-center md:flex'>
          <ArrowButton
            className=' bg-accent_green shadow-orange-400 rotate-180 '
            onClick={handlePrev}
          />
        </div>
        <div className='mb-5 mt-16 md:mb-16 flex flex-col  gap-10 md:flex-row'>
          {filteredRestaurants
            .slice(0, 20)
            .slice(currentIndex, currentIndex + itemsPerPage)
            .map((restaurant) => (
              <RestaurantCard
                id={restaurant.id}
                key={restaurant.id}
                rating={restaurant.rating}
                address={restaurant.address}
                name={restaurant.name}
                image={restaurant.image}
                category={restaurant.category}
              />
            ))}
        </div>
        <div className=' hidden flex-row gap-6 items-center md:flex'>
          <ArrowButton
            className=' bg-accent_green shadow-orange-400'
            onClick={handleNext}
          />
        </div>
      </div>
      <div className='mb-16 flex justify-between md:hidden '>
        <div className=' md:hidden flex-row gap-6 items-center flex'>
          <ArrowButton
            className=' bg-accent_green shadow-orange-400 rotate-180'
            onClick={handlePrev}
          />
        </div>
        <div className=' md:hidden flex-row gap-6 items-center flex'>
          <ArrowButton
            className=' bg-accent_green shadow-orange-400'
            onClick={handleNext}
          />
        </div>
      </div>
    </>
  );
};
