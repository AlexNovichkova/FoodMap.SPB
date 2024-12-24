import React, { SyntheticEvent } from 'react';
import { ArrowIcon } from '../ArrowIcon';

export const MainButton: React.FC<{
  title: string;
  onClick?: (() => void) | ((e: SyntheticEvent) => void);
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
  className: string;
  disabled?: boolean | undefined;
}> = ({ title, onClick, type, className, disabled }) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={
        className +
        ` main-button group bg-gradient-to-r from-green-400 to-accent_green shadow-sm flex flex-row justify-center items-center text-white text-lg h-[60px] text-center rounded-[8px] cursor-pointer border-none font-medium py-3 px-7 md:px-9 lg:py-5 lg:px-12 3xl:py-8 3xl:px-14  2xl:text-2xl transition-all focus:outline-none focus:shadow-accent-orange focus:shadow-accent_orange ${
          disabled ? 'animate-none cursor-auto' : ''
        }`
      }
      type={type}
    >
      <div className={`flex items-center justify-center mx-auto`}>
        <ArrowIcon
          className={` size-[18px] opacity-0 transition-all ${
            disabled ? 'group-hover:opacity-0 ' : 'group-hover:opacity-100'
          }`}
        />
        <span
          className={` title leading-none translate-x-0 -ml-6  ${
            disabled
              ? ' animate-none group-hover:animate-none '
              : 'animate-textBackwards group-hover:animate-textForwards'
          }`}
        >
          {title}
        </span>
      </div>
    </button>
  );
};
