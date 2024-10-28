import React, { SyntheticEvent } from 'react';
import { ArrowIcon } from '../ArrowIcon';

export const ArrowButton: React.FC<{
  onClick?: (() => void) | ((e: SyntheticEvent) => void);
  className?: string;
}> = ({ className, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={
        className +
        ' text-white group flex items-center size-8 md:size-10 lg:size-14 xl:size-16 justify-center py-[9px] pl-[11px] pr-[10px] rounded-full hover:shadow-green-400'
      }
    >
      <ArrowIcon className=' w-[8px] h-[14px] md:w-[9px] md:h-[15px] lg:w-[14px] lg:h-[25px] xl:w-[16px] xl:h-[27px] 2xl:w-[19px] 2xl:h-[29px] group-hover:animate-arrowForwards transition-all' />
    </button>
  );
};
