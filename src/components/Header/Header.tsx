'use client'
import React from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth/authContext';
import { useFolders } from '@/lib/hooks/useFolders';
import styles from './Header.module.scss';
import LogoutIcon from '/public/svg/logout.svg'
import FolderIcon from '/public/svg/folder.svg'
import Link from "next/link";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { isAuthenticated, logout } = useAuth();
  const { data: folders = [] } = useFolders();

  const handleLogout = () => {
    logout();
  };

  const handleFoldersClick = () => {
    router.push('/folders');
  };

  const handleBackClick = () => {
    router.push('/');
  };

  if (!isAuthenticated) {
    return null;
  }

  // Скрывать Header на этих страницах
  const hiddenPaths = ['/folders', '/notes/create', '/tasks/create'];
  const isEditNotePage = pathname?.startsWith('/notes/edit/');

  if (hiddenPaths.includes(pathname || '') || isEditNotePage) {
    return null;
  }

  // Определяем заголовок и показ иконки папки
  const isTasksPage = pathname === '/tasks';
  const pageTitle = isTasksPage ? 'Задачи' : 'Заметки';
  const showFolderIcon = !isTasksPage;

  const folderId = searchParams?.get('folderId');
  const currentFolder = folderId ? folders?.find(f => f.id === folderId) : null;

  return (
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.titleSection}>
            <Link href={isTasksPage ? '/tasks' : '/'} className={styles.title}>
              {pageTitle}
            </Link>
          </div>

          <div className={styles.iconSection}>
            {showFolderIcon && (
              <button className={styles.iconBtn} onClick={handleFoldersClick} title="Папки">
                <FolderIcon />
              </button>
            )}

            <button
              className={styles.iconBtn}
              onClick={handleLogout}
              title="Выйти"
            >
              <LogoutIcon />
            </button>
          </div>
        </div>
      </header>
  );
}