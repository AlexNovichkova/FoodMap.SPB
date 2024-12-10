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
          <div className=" flex flex-wrap gap-[10px] content-center items-start">
            {uniqueCategories.map((category) => (
              <label
                key={category}
                className="flex justify-center items-center text-black-600 hover:text-black-700 gap-[6px] lowercase text-base lg:text-lg xl:text-xl 2xl:text-2xl"
              >
                <input
                  className=" hover:scale-110  xl:size-[15px] 2xl:size-[17px]"
                  type="checkbox"
                  value={category}
                  checked={selectedCategories.includes(category)}
                  onChange={() => onCategoryChange(category)}
                />
                {category}
              </label>
            ))}
          </div>
        </div>

        {/* Цены */}
        <div className="filter-section max-w-96 2xl:w-auto">
          <h3 className="text-black-500 mb-2 font-semibold text-base lg:text-lg xl:text-xl 2xl:text-3xl break-words">
            Выберите ценовые категории:
          </h3>
          <div className="flex flex-wrap gap-2 content-center items-start">
            {uniquePrices.map((price) => (
              <label
                key={price}
                className="flex justify-center items-center text-black-600 gap-[6px] lowercase text-base hover:text-black-700 lg:text-lg xl:text-xl 2xl:text-2xl"
              >
                <input
                  className="hover:scale-110  xl:size-[15px] 2xl:size-[17px]"
                  type="checkbox"
                  value={price}
                  checked={selectedPrices.includes(price)}
                  onChange={() => onPriceChange(price)}
                />
                {price}
              </label>
            ))}
          </div>
        </div>

        {/* Сортировка */}
        <div className="max-w-96 2xl:w-auto">
          <h3 className="text-black-500 mb-2 font-semibold text-base lg:text-lg xl:text-xl 2xl:text-3xl break-words">
            Сортировка по рейтингу:
          </h3>
          <select
            className=" text-black-600 outline-none hover:outline-black-600 focus:outline-black-600 active:outline-black-600 hover:text-black-700 text-base lg:text-lg xl:text-xl 2xl:text-2xl"
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
