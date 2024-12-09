import { useState } from 'react';
import { Preloader } from 'src/app/Preloader';
import { selectIsLoading } from 'src/features/slices/restaurantsSlice';
import { useSelector } from 'src/features/store';
import { RestaurantCard } from 'src/widgets/RestaurantCard';
import { Pagination } from './ui/Pagination';

export const FindRestaurantPage = () => {
  const restaurants = useSelector((state) => state.restaurants.restaurants);
  // Состояния для фильтров с явными типами
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPrices, setSelectedPrices] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<'high' | 'low'>('high');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1); // Состояние для текущей страницы
  const isLoading = useSelector(selectIsLoading);
  const itemsPerPage = 20; // Количество ресторанов на одной странице

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((cat) => cat !== category)
        : [...prev, category]
    );
    setCurrentPage(1); // Сброс на первую страницу
  };

  const handlePriceChange = (price: string) => {
    setSelectedPrices((prev) =>
      prev.includes(price) ? prev.filter((p) => p !== price) : [...prev, price]
    );
    setCurrentPage(1); // Сброс на первую страницу
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(event.target.value as 'high' | 'low');
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Сброс на первую страницу
  };

  const uniqueCategories = Array.from(
    new Set(
      restaurants.flatMap((restaurant) =>
        restaurant.cuisine_type.map((cat) => cat)
      )
    )
  );

  const uniquePrices = Array.from(
    new Set(
      restaurants
        .map((restaurant) => restaurant.prices)
        .filter((prices): prices is string => prices !== undefined)
    )
  );

  const filteredRestaurants = restaurants.filter((restaurant) => {
    const matchesCategory = selectedCategories.length
      ? restaurant.cuisine_type.some((cat) => selectedCategories.includes(cat!))
      : true;

    const matchesPrice = selectedPrices.length
      ? selectedPrices.includes(restaurant.prices!)
      : true;

    const matchesSearchQuery =
      restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      restaurant.address.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesPrice && matchesSearchQuery;
  });

  const sortedRestaurants = filteredRestaurants.sort((a, b) => {
    if (sortOrder === 'high') {
      return b.rating - a.rating;
    } else {
      return a.rating - b.rating;
    }
  });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentRestaurants = sortedRestaurants.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const totalPages = Math.ceil(sortedRestaurants.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <main className="bg_section_profile">
      <section className="w-[95%] md:w-[90%] m-auto py-9 md:p-9">
        <div className="flex flex-col p-4 mb-6 bg-white shadow-md md:p-6 2xl:p-10 md:mb-8 rounded-[8px] m-auto gap-3 xl:gap-0">
          {/* Поисковая строка */}
          <div className="xl:mb-4">
            <h3 className="text-black-600 self-start font-bold text-base mb-3 md:text-lg lg:text-xl xl:text-2xl 2xl:text-4xl 2xl:my-4 break-words">
              Поиск
            </h3>
            <div className="w-full">
              <input
                type="text"
                placeholder="Поиск ресторана по названию..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="border p-2 w-full rounded-[8px] break-words xl:text-xl 2xl:text-2xl outline-accent_green active:outline-accent_green"
              />
            </div>
          </div>
          <h3 className="text-black-600 self-start font-bold text-base md:text-lg lg:text-xl xl:mb-3 2xl:my-4 xl:text-2xl 2xl:text-4xl break-words">
            Фильтры
          </h3>
          <div className="flex flex-wrap justify-between gap-6 ">
            <div className=" xl:w-auto ">
              <h3 className="text-black-500 mb-2 font-semibold text-base lg:text-lg xl:text-xl 2xl:text-3xl break-words">
                Выберите тип кухни:
              </h3>
              <div className=" flex flex-wrap gap-[10px] content-center items-start">
                {uniqueCategories.map((category) => (
                  <label
                    className="flex justify-center items-center text-black-600 gap-[6px] lowercase text-base lg:text-lg xl:text-xl 2xl:text-2xl"
                    key={category}
                  >
                    <input
                      className="xl:size-[15px] 2xl:size-[17px]"
                      type="checkbox"
                      value={category}
                      onChange={() => handleCategoryChange(category)}
                    />
                    {category}
                  </label>
                ))}
              </div>
            </div>
            <div className="max-w-96 2xl:w-auto">
              <h3 className="text-black-500 mb-2 font-semibold text-base lg:text-lg xl:text-xl 2xl:text-3xl break-words">
                Выберите ценовые категории:
              </h3>
              <div className=" flex flex-wrap gap-2 content-center items-start">
                {uniquePrices.map((price) => (
                  <label
                    className="flex justify-center items-center text-black-600 gap-[6px] lowercase text-base lg:text-lg xl:text-xl 2xl:text-2xl"
                    key={price}
                  >
                    <input
                      className="xl:size-[15px] 2xl:size-[17px]"
                      type="checkbox"
                      value={price}
                      onChange={() => handlePriceChange(price)}
                    />
                    {price}
                  </label>
                ))}
              </div>
            </div>
            <div className="max-w-96 2xl:w-auto">
              <h3 className="text-black-500 mb-2 font-semibold text-base lg:text-lg xl:text-xl 2xl:text-3xl break-words">
                Сортировка по рейтингу:
              </h3>
              <select
                className=" text-black-600 text-base lg:text-lg xl:text-xl 2xl:text-2xl"
                value={sortOrder}
                onChange={handleSortChange}
              >
                <option value="high">Сначала с высоким рейтингом</option>
                <option value="low">Сначала с низким рейтингом</option>
              </select>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center mt-8 mb-8">
          <div className="flex flex-wrap gap-8 md:gap-6 m-auto justify-center md:justify-normal ">
            {isLoading ? ( // Условный рендеринг прелоадера
              <Preloader />
            ) : currentRestaurants.length > 0 ? (
              currentRestaurants.map((restaurant) => (
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
            ) : (
              <p className="flex items-center justify-center cursor-pointer gap-5 text-black-500 py-8 text-lg lg:text-xl xl:text-2xl xl:py-10">
                Нет доступных ресторанов
              </p> // Сообщение, если ресторанов нет
            )}
          </div>
        </div>
        {/* Пагинация */}
        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        )}
        {/*
        <div
          className={`flex flex-wrap gap-2 mt-4 ${
            totalPages < 25 ? 'justify-center' : 'justify-start'
          }`}
        >
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`size-8 rounded-[8px] lg:size-10 2xl:size-12 hover:bg-accent_orange ${
                page === currentPage
                  ? 'bg-accent_orange text-white'
                  : 'bg-accent_green text-white'
              }`}
            >
              {page}
            </button>
          ))}
        </div>*/}
      </section>
    </main>
  );
};
