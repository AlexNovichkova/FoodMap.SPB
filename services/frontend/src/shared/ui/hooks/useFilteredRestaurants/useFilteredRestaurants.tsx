import { useMemo } from 'react';

export const useFilteredRestaurants = (
  restaurants: any[],
  filters: {
    categories: string[];
    prices: string[];
    searchQuery: string;
    sortOrder: 'high' | 'low';
  }
) => {
  const { categories, prices, searchQuery, sortOrder } = filters;

  const filteredRestaurants = useMemo(() => {
    return restaurants.filter((restaurant) => {
      const matchesCategory = categories.length
        ? restaurant.cuisine_type.some((cat: string) =>
            categories.includes(cat)
          )
        : true;

      const matchesPrice = prices.length
        ? prices.includes(restaurant.prices)
        : true;

      const matchesSearchQuery =
        restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        restaurant.address.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesPrice && matchesSearchQuery;
    });
  }, [restaurants, categories, prices, searchQuery]);

  const sortedRestaurants = useMemo(() => {
    return filteredRestaurants.sort((a, b) =>
      sortOrder === 'high' ? b.rating - a.rating : a.rating - b.rating
    );
  }, [filteredRestaurants, sortOrder]);

  return sortedRestaurants;
};
