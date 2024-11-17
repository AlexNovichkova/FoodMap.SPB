import { CategorySection } from './ui/CategorySection';
import { HighRateSection } from './ui/HighRateSection';
import { HeadingSection } from './ui/HeadingSection';
import { MoreSection } from './ui/MoreSection';

export const HomePage = () => {
  return (
    <main>
      <HeadingSection />
      <CategorySection />
      <HighRateSection />
      <MoreSection />
    </main>
  );
};
