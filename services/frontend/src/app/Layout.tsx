import { Header } from 'src/widgets/Header';
import { Footer } from 'src/widgets/Footer';
import { FC, ReactNode } from 'react';

export const Layout: FC<{
  children: ReactNode;
}> = ({ children }) => {
  return (
    <>
      <Header />

      {children}

      <Footer />
    </>
  );
};
