interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
}) => {
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const visibleRange = 1; // Количество страниц слева и справа от текущей
    const ellipsis = '...';

    const addEllipsisIfNeeded = (
      prevPage: number | string,
      currPage: number
    ) => {
      if (typeof prevPage === 'number' && currPage - prevPage > 1) {
        pages.push(ellipsis);
      }
    };

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - visibleRange && i <= currentPage + visibleRange)
      ) {
        const prevPage = pages[pages.length - 1];
        addEllipsisIfNeeded(prevPage, i);
        pages.push(i);
      }
    }

    return pages;
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 mb-8 mt-10">
      {/* Кнопка назад */}
      <button
        className={` md:px-3 md:py-1 lg:py-2 lg:text-xl 2xl:text-2xl rounded-full ${
          currentPage === 1
            ? 'opacity-50 cursor-not-allowed'
            : 'hover:bg-black-500 hover:bg-opacity-10'
        }`}
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        &laquo;
      </button>
      {/* Номера страниц */}
      {getPageNumbers().map((page, index) =>
        typeof page === 'number' ? (
          <button
            key={index}
            onClick={() => onPageChange(page)}
            className={`size-8 md:size-8 rounded-[8px] lg:size-10 lg:text-lg 2xl:text-xl 2xl:size-12 hover:bg-accent_orange ${
              currentPage === page
                ? 'bg-accent_orange text-white'
                : 'bg-accent_green text-white'
            }`}
          >
            {page}
          </button>
        ) : (
          <span key={index} className="px-3 py-2">
            {page}
          </span>
        )
      )}
      {/* Кнопка вперед */}
      <button
        className={` md:px-3 md:py-1 lg:py-2 lg:text-xl 2xl:text-2xl rounded-full ${
          currentPage === totalPages
            ? 'opacity-50 cursor-not-allowed'
            : 'hover:bg-black-500 hover:bg-opacity-10'
        }`}
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        &raquo;
      </button>
    </div>
  );
};
