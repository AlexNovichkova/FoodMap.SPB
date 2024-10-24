import React from 'react';
import { ArrowButton } from 'src/shared/ui/ArrowButton';
import { CategoryCard } from './ui/CategoryCard';

export const CategorySection = () => {
  return (
    <section className=' bg_section_category'>
      <div className=' pt-20 mx-5 md:m-auto md:w-[90%]'>
        <div className=' flex flex-col gap-6 justify-between md:gap-0 md:flex-row'>
          <h2 className=' flex items-start leading-none text-xl font-bold text-black-600 md:text-2xl lg:text-3xl xl:text-4xl'>
            Выбери любимую кухню
          </h2>
          <div className=' flex flex-row gap-6 items-center'>
            <span className=' text-lg font-bold text-accent_green md:text-base lg:text-xl xl:text-2xl'>
              Посмотреть все категории
            </span>
            <ArrowButton className=' bg-accent_green shadow-orange-400' />
          </div>
        </div>
        <div className=' mt-16 mb-16 flex flex-col lg:flex-row'>
          <CategoryCard
            name='Азиатская'
            src='https://i.pinimg.com/736x/5d/04/ed/5d04ed8a45ba7d555b9a998daebd2a23.jpg'
          />
        </div>
      </div>
    </section>
  );
};
