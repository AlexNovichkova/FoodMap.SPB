import { FC, useEffect, useState } from 'react';
import { ArrowButton } from 'src/shared/ui/ArrowButton';
import { RestaurantCard } from '../RestaurantCard';
import { useDispatch, useSelector } from 'src/features/store';
import {
  fetchRestaurants,
  selectIsLoading,
} from 'src/features/slices/restaurantsSlice';
import { testRestaurants } from 'src/app/testData';
import {
  TNewRestaurant,
  TRestaurant,
} from 'src/entities/projects/models/types';
import { Link } from 'react-router-dom';
import { Preloader } from 'src/app/Preloader';

export const RestaurantsContainer: FC<{
  shouldFilterByRating: boolean;
  restaurants: TRestaurant[];
}> = ({ shouldFilterByRating, restaurants }) => {
  const dispatch = useDispatch();
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
    } else if (window.innerWidth < 1900) {
      setItemsPerPage(4);
    } else if (window.innerWidth < 2300) {
      setItemsPerPage(5);
    } else {
      setItemsPerPage(6);
    }
  };

  useEffect(() => {
    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);
    return () => {
      window.removeEventListener('resize', updateItemsPerPage);
    };
  }, []);

  useEffect(() => {
    // Вместо вызова API, используем тестовые данные
    dispatch({
      type: 'restaurants/getAllRestaurants/fulfilled',
      payload: testRestaurants,
    });
    /*dispatch(fetchRestaurants());*/
  }, [dispatch]);

  const filteredRestaurants = shouldFilterByRating
    ? restaurants.filter((restaurant) => restaurant.rating > 4.7)
    : restaurants;
  // Определяем, какие рестораны показывать

  const handleNext = () => {
    if (currentIndex + itemsPerPage < filteredRestaurants.length) {
      setCurrentIndex(currentIndex + itemsPerPage);
    }
  };

  const handlePrev = () => {
    if (currentIndex - itemsPerPage >= 0) {
      setCurrentIndex(currentIndex - itemsPerPage);
    }
  };

  const canNext = currentIndex + itemsPerPage < filteredRestaurants.length;
  const canPrev = currentIndex > 0;

  if (filteredRestaurants.length === 0) {
    return (
      <div className="flex items-center justify-center cursor-pointer gap-5 text-black-500 py-8 text-lg lg:text-xl xl:text-2xl xl:py-10">
        <Link
          to={`/restaurants`}
          className="hover:text-green-600 hover:border-b-green-600 hover:border-b "
        >
          Ничего не найдено <span>&#9785;</span>
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-row justify-center md:justify-between w-full">
        <div className="hidden flex-row gap-6 items-center md:flex">
          <ArrowButton
            className={
              canPrev
                ? 'bg-accent_green shadow-orange-400 rotate-180'
                : 'bg-black-500 opacity-50 cursor-not-allowed rotate-180 '
            }
            onClick={handlePrev}
            disabled={!canPrev} // Отключаем кнопку, если нельзя перейти назад
          />
        </div>
        <div className="mb-5 mt-16 md:mb-16 flex flex-col gap-10 md:flex-row">
          {isLoading ? ( // Условный рендеринг прелоадера или карты
            <Preloader />
          ) : (
            filteredRestaurants
              .slice(currentIndex, currentIndex + itemsPerPage)
              .map((restaurant) => (
                <RestaurantCard
                  id={restaurant.id}
                  key={restaurant.id}
                  rating={restaurant.rating}
                  address={restaurant.address}
                  name={restaurant.name}
                  photo_links={restaurant.photo_links}
                  cuisine_type={restaurant.cuisine_type}
                />
              ))
          )}
        </div>
        <div className="hidden flex-row gap-6 items-center md:flex">
          <ArrowButton
            className={
              canNext
                ? 'bg-accent_green shadow-orange-400'
                : 'bg-black-500 opacity-50 cursor-not-allowed animate-none'
            }
            onClick={handleNext}
            disabled={!canNext} // Отключаем кнопку, если нельзя перейти вперед
          />
        </div>
      </div>
      <div className="mb-16 mt-8 flex justify-between md:hidden">
        <div className="md:hidden flex-row gap-6 items-center flex">
          <ArrowButton
            className={
              canPrev
                ? 'bg-accent_green shadow-orange-400 rotate-180'
                : 'bg-black-500 opacity-50 cursor-not-allowed rotate-180 animate-none'
            }
            onClick={handlePrev}
            disabled={!canPrev}
          />
        </div>
        <div className="md:hidden flex-row gap-6 items-center flex">
          <ArrowButton
            className={
              canNext
                ? 'bg-accent_green shadow-orange-400'
                : 'bg-black-500 opacity-50 cursor-not-allowed animate-none'
            }
            onClick={handleNext}
            disabled={!canNext}
          />
        </div>
      </div>
    </>
  );
};
