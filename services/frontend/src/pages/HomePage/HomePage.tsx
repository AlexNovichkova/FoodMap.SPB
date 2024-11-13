import React from 'react';
import { CategorySection } from './ui/CategorySection';
import { HighRateSection } from './ui/HighRateSection';
import { HeadingSection } from './ui/HeadingSection';

export const HomePage = () => {
  return (
    <main>
      <HeadingSection />
      <CategorySection />
      <HighRateSection />
    </main>
  );
};
