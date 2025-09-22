'use client'
import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import cn from 'classnames';
import styles from './BottomTabs.module.scss';

type Props = {
  className?: string;
};

export default function BottomTabs({ className }: Props) {
  const pathname = usePathname();

  const tabs = [
    {
      href: '/',
      label: 'Заметки',
      isActive: pathname === '/'
    },
    {
      href: '/tasks',
      label: 'Задачи',
      isActive: pathname === '/tasks'
    }
  ];

  return (
    <nav className={cn(styles.bottomTabs, className)}>
      <div className={styles.container}>
        {tabs.map((tab) => (
          <Link
            key={tab.href}
            href={tab.href}
            className={cn(styles.tab, tab.isActive && styles.active)}
          >
            {tab.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}