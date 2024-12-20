import { useEffect, useState } from 'react';
import { Preloader } from 'src/app/Preloader';
import { selectIsLoading } from 'src/features/slices/restaurantsSlice';
import { useSelector } from 'src/features/store';
import { RestaurantCard } from 'src/widgets/RestaurantCard';
import { Pagination } from './ui/Pagination';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Filters } from './ui/Filters';
import { Search } from './ui/Search';
import { useFilteredRestaurants } from 'src/shared/ui/hooks/useFilteredRestaurants';
import { usePagination } from 'src/shared/ui/hooks/usePagination';

export const FindRestaurantPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get('category');
  const restaurants = useSelector((state) => state.restaurants.restaurants);
  const isLoading = useSelector(selectIsLoading);

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPrices, setSelectedPrices] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<'high' | 'low'>('high');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filters = {
    categories: selectedCategories,
    prices: selectedPrices,
    searchQuery,
    sortOrder,
  };

  const sortedRestaurants = useFilteredRestaurants(restaurants, filters);
  const { currentPage, totalPages, currentItems, setCurrentPage } =
    usePagination(
      sortedRestaurants,
      20 // itemsPerPage
    );

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((cat) => cat !== category)
        : [...prev, category]
    );
    setCurrentPage(1);
  };

  const handlePriceChange = (price: string) => {
    setSelectedPrices((prev) =>
      prev.includes(price) ? prev.filter((p) => p !== price) : [...prev, price]
    );
    setCurrentPage(1);
  };

  const handleSortChange = (sortOrder: 'high' | 'low') => {
    setSortOrder(sortOrder);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setSelectedCategories([]);
    setSelectedPrices([]);
    setSortOrder('high');
    setSearchQuery('');
    setCurrentPage(1);
    navigate('/restaurants');
  };

  useEffect(() => {
    if (categoryFromUrl) {
      setSelectedCategories((prev) => [...new Set([...prev, categoryFromUrl])]);
    }
  }, [categoryFromUrl]);

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

  return (
    <main className="bg_section_profile">
      <section className="w-[95%] md:w-[90%] m-auto py-9 md:p-9">
        <div className="flex flex-col p-4 mb-6 bg-white shadow-md md:p-6 2xl:p-10 md:mb-8 rounded-[8px] m-auto gap-3 xl:gap-0">
          <Search value={searchQuery} onSearchChange={handleSearchChange} />
          <Filters
            uniqueCategories={uniqueCategories}
            uniquePrices={uniquePrices}
            selectedCategories={selectedCategories}
            selectedPrices={selectedPrices}
            sortOrder={sortOrder}
            onCategoryChange={handleCategoryChange}
            onPriceChange={handlePriceChange}
            onSortChange={handleSortChange}
          />
          <button
            onClick={handleResetFilters}
            className="text-black-500 my-3 py-1 px-2 font-semibold text-base self-start rounded-[8px] border border-black-500 hover:bg-black-500 hover:border-white hover:text-white lg:text-lg xl:text-xl 2xl:text-3xl break-words transition-all"
          >
            Сбросить фильтры
          </button>
        </div>
        <div className="flex justify-center items-center mt-8 mb-8">
          <div className="flex flex-wrap gap-8 md:gap-6 m-auto justify-center md:justify-normal ">
            {isLoading ? (
              <Preloader />
            ) : currentItems.length > 0 ? (
              currentItems.map((restaurant) => (
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
              <p className="flex items-center justify-center cursor-pointer gap-5 text-black-500 py-8 text-lg lg:text-xl xl:text-2xl xl:py-10 3xl:text-3xl 3xl:py-14">
                Нет доступных ресторанов
              </p>
            )}
          </div>
        </div>
        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}
      </section>
    </main>
  );
};
