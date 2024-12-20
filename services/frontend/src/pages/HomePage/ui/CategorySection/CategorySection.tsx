import { useState } from 'react';
import { ArrowButton } from 'src/shared/ui/ArrowButton';
import { CategoryCard } from './ui/CategoryCard';
import { useSelector } from 'src/features/store';
import { Preloader } from 'src/app/Preloader';
import { selectIsLoading } from 'src/features/slices/categoriesSlice';

export const CategorySection = () => {
  /*const restaurants = useSelector((state) => state.restaurants.restaurants);*/
  const categories = useSelector((state) => state.categories.categories);
  const isLoading = useSelector(selectIsLoading);
  /*const uniqueCategories = Array.from(
    new Set(
      restaurants.flatMap((restaurant) => restaurant.category.map((cat) => cat))
    )
  );*/

  const [showAll, setShowAll] = useState(false);

  const toggleShowAll = () => {
    setShowAll((prev) => !prev);
  };
  return (
    <section className=" bg_section_category">
      <div className=" pt-20 mx-5 md:m-auto md:w-[90%]">
        <div className=" flex flex-col gap-6 justify-between md:gap-0 md:flex-row">
          <h2 className=" flex items-start leading-none text-xl font-bold text-black-600 md:text-2xl lg:text-3xl xl:text-4xl 3xl:text-[2.5rem]">
            Выбери любимую кухню
          </h2>
          <div className=" flex flex-row gap-6 items-center">
            <span className=" text-lg font-bold text-accent_green md:text-base lg:text-xl xl:text-2xl 3xl:text-3xl">
              Посмотреть все категории
            </span>
            <ArrowButton
              onClick={toggleShowAll}
              className={`bg-accent_green shadow-orange-400 transition-transform duration-300 hover:rotate-90 animate-none ${
                showAll ? 'rotate-90 hover:rotate-0' : 'rotate-0'
              }`}
            />
          </div>
        </div>
        <div className=" mt-16 mb-16 gap-3 lg:gap-6 xl:gap-8 category_grid transition-all">
          {isLoading ? (
            <Preloader />
          ) : categories.length > 0 ? (
            categories
              .slice(0, showAll ? categories.length : 8)
              .map((category) => (
                <CategoryCard
                  key={category.name}
                  name={category.name}
                  src={
                    category.photo_link ||
                    'https://avatars.mds.yandex.net/i?id=2eb19203b95d3fe798621110fe66e333_l-5235083-images-thumbs&n=13'
                  }
                />
              ))
          ) : (
            <p className="flex items-center justify-center cursor-pointer gap-5 text-black-500 py-8 text-lg lg:text-xl xl:text-2xl xl:py-10">
              Нет доступных категорий
            </p>
          )}
        </div>
      </div>
    </section>
  );
};
