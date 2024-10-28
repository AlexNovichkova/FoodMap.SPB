import React from 'react';

export const CategoryCard: React.FC<{
  name: string;
  src: string;
}> = ({ name, src }) => {
  return (
    <div className=' flex flex-col gap-4'>
      <div className=' w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 xl:w-60 xl:h-60 2xl:w-64 2xl:h-64'>
        <img
          className=' object-cover object-center rounded-[16px] h-full w-full'
          src={src}
        />
      </div>
      <span className=' text-black-600 font-bold text-base md:text-lg lg:text-xl xl:text-2xl'>
        {name}
      </span>
    </div>
  );
};
