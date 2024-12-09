import React from 'react';

export const CategoryCard: React.FC<{
  name: string;
  src: string;
}> = ({ name, src }) => {
  return (
    <div className=" flex flex-col gap-4">
      <div className=" w-full aspect-square">
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
