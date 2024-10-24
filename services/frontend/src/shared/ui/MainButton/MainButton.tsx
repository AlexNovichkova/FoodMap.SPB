import React from 'react';
import { ArrowIcon } from '../ArrowIcon';

export const MainButton: React.FC<{
  title: string;
  onClick?: () => void;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
  className: string;
}> = ({ title, onClick, type, className }) => {
  return (
    <button
      onClick={onClick}
      className={
        className +
        ` main-button group bg-gradient-to-r from-green-400 to-accent_green shadow-sm flex flex-row justify-center items-center text-white text-lg h-[60px] text-center rounded-[8px] cursor-pointer border-none font-medium py-3 px-7 md:px-9 lg:py-5 lg:px-12  2xl:text-2xl transition-all focus:outline-none focus:shadow-accent-orange focus:shadow-accent_orange`
      }
      type={type}
    >
      <div className={`flex items-center justify-center mx-auto`}>
        <ArrowIcon
          className={` size-[18px] opacity-0 group-hover:opacity-100 transition-all`}
        />
        <span className=' title leading-none translate-x-0 animate-textBackwards -ml-6 group-hover:animate-textForwards'>
          {title}
        </span>
      </div>
    </button>
  );
};
