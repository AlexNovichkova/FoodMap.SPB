import React from 'react';

export const CategoryCard: React.FC<{
  name: string;
  src: string;
}> = ({ name, src }) => {
  return (
    <div className=' flex flex-col gap-4 w-fit'>
      <div className=' w-28 h-28 md:w-40 md:h-40 lg:w-52 lg:h-52 xl:w-56 xl:h-56 2xl:w-64 2xl:h-64'>
        <img
          className=' object-cover object-center rounded-[16px] h-full w-full'
          src={src}
        />
      </div>
      <span className=' text-black-600 ml-1 font-bold text-base md:text-lg lg:text-xl xl:text-2xl'>
        {name}
      </span>
    </div>
  );
};
