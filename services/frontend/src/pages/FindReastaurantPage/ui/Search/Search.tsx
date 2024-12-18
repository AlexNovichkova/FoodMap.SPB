interface SearchProps {
  value: string;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Search: React.FC<SearchProps> = ({ value, onSearchChange }) => {
  return (
    <div className="xl:mb-4">
      <h3 className="text-black-600 self-start font-bold text-base mb-3 md:text-lg lg:text-xl xl:text-2xl 2xl:text-4xl 2xl:my-4 break-words">
        Поиск
      </h3>
      <div className="w-full">
        <input
          type="text"
          placeholder="Поиск ресторана по названию..."
          value={value}
          onChange={onSearchChange}
          className="border p-2 w-full rounded-[8px] break-words xl:text-xl 2xl:text-2xl outline-accent_green active:outline-accent_green"
        />
      </div>
    </div>
  );
};
