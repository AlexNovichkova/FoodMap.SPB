import React from 'react';
import { ArrowIcon } from '../ArrowIcon';

export const ArrowButton: React.FC<{
  className?: string;
}> = ({ className }) => {
  return (
    <button
      className={
        className +
        ' text-white flex items-center size-8 md:size-10 lg:size-14 xl:size-16 justify-center py-[9px] pl-[11px] pr-[10px] rounded-full'
      }
    >
      <ArrowIcon className=' w-[8px] h-[14px] md:w-[9px] md:h-[15px] lg:w-[14px] lg:h-[25px] xl:w-[16px] xl:h-[27px] 2xl:w-[19px] 2xl:h-[29px] ' />
    </button>
  );
};
