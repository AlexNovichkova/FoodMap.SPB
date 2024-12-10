import React from 'react';
import { useNavigate } from 'react-router-dom';

export const CategoryCard: React.FC<{
  name: string;
  src: string;
}> = ({ name, src }) => {
  const navigate = useNavigate();

  const handleCategoryClick = () => {
    navigate(`/restaurants?category=${encodeURIComponent(name)}`);
  };
  return (
    <div
      onClick={handleCategoryClick}
      className=" flex flex-col gap-4 cursor-pointer "
    >
      <div className=" w-full aspect-square rounded-[16px] hover:shadow-lg hover:shadow-accent_orange">
        <img
          className=" object-cover object-center rounded-[16px] h-full w-full"
          src={src}
        />
      </div>
      <span className=" text-black-600 ml-1 font-bold text-base md:text-lg lg:text-xl xl:text-2xl 3xl:text-3xl break-words">
        {name}
      </span>
    </div>
  );
};
