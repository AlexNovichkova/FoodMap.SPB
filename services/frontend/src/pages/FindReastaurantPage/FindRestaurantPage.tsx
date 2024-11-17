import { useState } from 'react';
import { useSelector } from 'src/features/store';
import { RestaurantCard } from 'src/widgets/RestaurantCard';

export const FindRestaurantPage = () => {
  const restaurants = useSelector((state) => state.restaurants.restaurants);

  // Состояния для фильтров с явными типами
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPrices, setSelectedPrices] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<'high' | 'low'>('high');
  const [searchQuery, setSearchQuery] = useState<string>(''); // Состояние для поискового запроса

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev: string[]) =>
      prev.includes(category)
        ? prev.filter((cat) => cat !== category)
        : [...prev, category]
    );
  };

  const handlePriceChange = (price: string) => {
    setSelectedPrices((prev: string[]) =>
      prev.includes(price) ? prev.filter((p) => p !== price) : [...prev, price]
    );
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(event.target.value as 'high' | 'low');
  };

  // Функция для обработки изменения поискового запроса
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const uniqueCategories = Array.from(
    new Set(
      restaurants.flatMap((restaurant) =>
        restaurant.category.map((cat) => cat.name)
      )
    )
  );

  const uniquePrices = Array.from(
    new Set(
      restaurants
        .map((restaurant) => restaurant.price)
        .filter((price): price is string => price !== undefined)
    )
  );

  const filteredRestaurants = restaurants.filter((restaurant) => {
    const matchesCategory = selectedCategories.length
      ? restaurant.category.some((cat) =>
          selectedCategories.includes(cat.name!)
        )
      : true;

    const matchesPrice = selectedPrices.length
      ? selectedPrices.includes(restaurant.price!)
      : true;

    const matchesSearchQuery = restaurant.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return matchesCategory && matchesPrice && matchesSearchQuery;
  });

  const sortedRestaurants = filteredRestaurants.sort((a, b) => {
    if (sortOrder === 'high') {
      return b.rating - a.rating; // Сначала с высоким рейтингом
    } else {
      return a.rating - b.rating; // Сначала с низким рейтингом
    }
  });

  return (
    <main className="bg_section_profile">
      <section className="w-[95%] md:w-[90%] m-auto py-9 md:p-9">
        <div className="flex flex-col p-4 mb-6 bg-white shadow-md md:p-6 2xl:p-10 md:mb-8 rounded-[8px] m-auto gap-3 xl:gap-0">
          {/* Поисковая строка */}
          <div className="xl:mb-4">
            <h3 className="text-black-600 self-start font-bold text-base md:text-lg lg:text-xl xl:text-2xl break-words mb-3">
              Поиск
            </h3>
            <div className="w-full">
              <input
                type="text"
                placeholder="Поиск ресторана по названию..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="border p-2 w-full rounded-[8px] break-words"
              />
            </div>
          </div>
          <h3 className="text-black-600 self-start font-bold text-base md:text-lg lg:text-xl xl:mb-3 xl:text-2xl break-words">
            Фильтры
          </h3>
          <div className="flex flex-wrap justify-between gap-6 ">
            <div className=" xl:max-w-72 2xl:max-w-lg xl:w-auto">
              <h3 className="text-black-500 mb-2 font-semibold text-base lg:text-lg xl:text-xl 2xl:text-2xl break-words">
                Выберите тип кухни:
              </h3>
              <div className=" flex flex-wrap gap-[10px] content-center items-start">
                {uniqueCategories.map((category) => (
                  <label
                    className="flex justify-center items-center text-black-600 gap-[6px] lowercase text-base lg:text-lg xl:text-xl"
                    key={category}
                  >
                    <input
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
              <h3 className="text-black-500 mb-2 font-semibold text-base lg:text-lg xl:text-xl 2xl:text-2xl break-words">
                Выберите ценовые категории:
              </h3>
              <div className=" flex flex-wrap gap-2 content-center items-start">
                {uniquePrices.map((price) => (
                  <label
                    className="flex justify-center items-center text-black-600 gap-[6px] lowercase text-base lg:text-lg xl:text-xl"
                    key={price}
                  >
                    <input
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
              <h3 className="text-black-500 mb-2 font-semibold text-base lg:text-lg xl:text-xl 2xl:text-2xl break-words">
                Сортировка по рейтингу:
              </h3>
              <select
                className=" text-black-600 text-base lg:text-lg xl:text-xl"
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
            {sortedRestaurants.map((restaurant) => (
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
        </div>
      </section>
    </main>
  );
};
