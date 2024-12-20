import React, { SyntheticEvent } from 'react';
import { ArrowIcon } from '../ArrowIcon';

export const ArrowButton: React.FC<{
  onClick?: (() => void) | ((e: SyntheticEvent) => void);
  className?: string;
  disabled?: boolean; // Добавлено свойство disabled
}> = ({ className, onClick, disabled }) => {
  return (
    <button
      onClick={disabled ? undefined : onClick} // Отключаем обработчик клика, если disabled
      className={
        className +
        ' text-white group flex items-center size-14 md:size-12 lg:size-14 xl:size-16 justify-center py-[9px] pl-[11px] pr-[10px] rounded-full hover:shadow-green-400 ' +
        (disabled ? 'opacity-50 cursor-not-allowed' : '') // Добавляем стили для отключенной кнопки
      }
      disabled={disabled} // Устанавливаем свойство disabled
    >
      <ArrowIcon
        className={
          'w-[14px] h-[25px] md:w-[11px] md:h-[17px] lg:w-[14px] lg:h-[25px] xl:w-[16px] xl:h-[27px] 2xl:w-[19px] 2xl:h-[29px] group-hover:animate-arrowForwards transition-all' +
          (disabled ? 'opacity-50 group-hover:animate-none' : '')
        }
      />
    </button>
  );
};
