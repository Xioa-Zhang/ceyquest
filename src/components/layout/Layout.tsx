import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import heroBg from '@/assets/hero_bg.png';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const isCeynovXPage = location.pathname === '/ceynovx';

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      {!isCeynovXPage && <Sidebar />}
      <main className={isCeynovXPage ? 'ml-0' : 'ml-64'}>
        {children}
      </main>
    </div>
  );
};

export default Layout;