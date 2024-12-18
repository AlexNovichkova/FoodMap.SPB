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
  return (
    <>
      <h3 className="text-black-600 self-start font-bold text-base md:text-lg lg:text-xl xl:mb-3 2xl:my-4 xl:text-2xl 2xl:text-4xl break-words">
        Фильтры
      </h3>
      <div className="filters-container flex flex-wrap justify-between gap-6">
        {/* Категории */}
        <div className="filter-section xl:w-auto">
          <h3 className="text-black-500 mb-2 font-semibold text-base lg:text-lg xl:text-xl 2xl:text-3xl break-words">
            Выберите тип кухни:
          </h3>
          <div className=" flex flex-wrap gap-2 gap-x-5 pl-3.5 content-center items-start">
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
          <div className="flex flex-wrap gap-2 gap-x-5 pl-3.5 content-center items-start">
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
