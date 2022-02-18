import { ReactNode } from 'react';
import Footer from './shared/Footer';
import Header from './shared/Header';

type Props = {
  children: ReactNode;
};

export function Layout({ children, ...props }: Props) {
  return (
    <div {...props}>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
