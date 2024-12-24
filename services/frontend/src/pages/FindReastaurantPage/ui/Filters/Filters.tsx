import { useState } from 'react';
import { Checkbox } from './Checkbox';

interface FiltersProps {
  uniqueCategories: string[];
  uniquePrices: string[];
  selectedCategories: string[];
  selectedPrices: string[];
  sortOrder: 'high' | 'low';
  onCategoryChange: (category: string) => void;
  onPriceChange: (price: string) => void;
  onSortChange: (sortOrder: 'high' | 'low') => void;
}

export const Filters: React.FC<FiltersProps> = ({
  uniqueCategories,
  uniquePrices,
  selectedCategories,
  selectedPrices,
  sortOrder,
  onCategoryChange,
  onPriceChange,
  onSortChange,
}) => {
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);

  const toggleFiltersVisibility = () => {
    setIsFiltersVisible((prev) => !prev);
  };
  return (
    <>
      <h3 className="text-black-600 self-start font-bold text-base md:text-lg lg:text-xl xl:mb-3 2xl:my-4 xl:text-2xl 2xl:text-4xl break-words">
        Фильтры
      </h3>
      <div className="filters-container flex flex-wrap justify-between gap-4 md:gap-6">
        {/* Категории */}
        <div className={` filter-section xl:w-auto`}>
          <h3 className="text-black-500 mb-2 font-semibold text-base lg:text-lg xl:text-xl 2xl:text-3xl break-words">
            Выберите тип кухни:
          </h3>
          <button
        onClick={toggleFiltersVisibility}
        className={`flex items-center justify-between w-full  py-2 px-3 font-semibold text-base rounded-[8px] border  lg:text-lg xl:text-xl transition-all lg:hidden ${
          isFiltersVisible ? 'bg-black-500 border-white text-white hover:text-black-500 hover:bg-white hover:border-black-500' : 'text-black-500 border-black-500 hover:bg-black-500 hover:border-white hover:text-white'
        }`}
      >
        {isFiltersVisible ? 'Скрыть фильтры' : 'Показать фильтры'}
        <span
          className={`ml-2 transform transition-transform ${
            isFiltersVisible ? 'rotate-180' : ''
          }`}
        >
          ▼
        </span>
      </button>
          <div className={`overflow-hidden transition-all duration-500 ease-in-out flex flex-wrap mt-4 lg:mt-0 gap-2 gap-x-5 xl:gap-x-6 2xl:gap-x-7 pl-3.5 xl:pl-4 2xl:pl-5 content-center items-start  ${
                isFiltersVisible ? ' max-h-[1000px] opacity-100' : 'max-h-0 opacity-0' 
              } lg:max-h-[none] lg:opacity-100  `}>
            {uniqueCategories.map((category) => (
              <Checkbox
                key={category}
                label={category}
                isChecked={selectedCategories.includes(category)}
                onChange={() => onCategoryChange(category)}
              />
            ))}
          </div>
        </div>

        {/* Цены */}
        <div className="filter-section max-w-96 2xl:w-auto">
          <h3 className="text-black-500 mb-2 font-semibold text-base lg:text-lg xl:text-xl 2xl:text-3xl break-words">
            Выберите ценовые категории:
          </h3>
          <div className="flex flex-wrap gap-2 gap-x-5 xl:gap-x-6 2xl:gap-x-7 pl-3.5 xl:pl-4 2xl:pl-5 content-center items-start">
            {uniquePrices.map((price) => (
              <Checkbox
                key={price}
                label={price}
                isChecked={selectedPrices.includes(price)}
                onChange={() => onPriceChange(price)}
              />
            ))}
          </div>
        </div>

        {/* Сортировка */}
        <div className="max-w-96 2xl:w-auto">
          <h3 className="text-black-500 mb-2 font-semibold text-base lg:text-lg xl:text-xl 2xl:text-3xl break-words">
            Сортировка по рейтингу:
          </h3>
          <select
            className=" cursor-pointer text-black-600 outline-none hover:outline-black-600 focus:outline-black-600 active:outline-black-600 hover:text-black-700 text-base lg:text-lg xl:text-xl 2xl:text-2xl"
            value={sortOrder}
            onChange={(e) => onSortChange(e.target.value as 'high' | 'low')}
          >
            <option value="high">Сначала с высоким рейтингом</option>
            <option value="low">Сначала с низким рейтингом</option>
          </select>
        </div>
      </div>
    </>
  );
};
