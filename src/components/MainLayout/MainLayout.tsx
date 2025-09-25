'use client'
import React from 'react';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth/authContext';
import Header from '@/components/Header/Header';
import BottomTabs from '@/components/BottomTabs/BottomTabs';
import cn from 'classnames';
import styles from './MainLayout.module.scss';

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function MainLayout({ children, className }: Props) {
  const pathname = usePathname();
  const { isAuthenticated } = useAuth();

  const hiddenPaths = ['/folders', '/notes/create', '/tasks/create'];
  const isEditNotePage = pathname?.startsWith('/notes/edit/');
  const isEditTaskPage = pathname?.startsWith('/tasks/edit/');
  const isAuthPage = pathname === '/login' || pathname === '/register';

  const shouldHideNavigation = hiddenPaths.includes(pathname || '') || isEditNotePage || isEditTaskPage || isAuthPage || !isAuthenticated;

  return (
    <div className={cn(styles.layout, className)}>
      {!shouldHideNavigation && <Header />}

      <main className={cn(
        styles.main,
        shouldHideNavigation && styles.fullHeight
      )}>
        {children}
      </main>

      {!shouldHideNavigation && <BottomTabs />}
    </div>
  );
}