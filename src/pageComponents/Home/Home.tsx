"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useNotes } from "@/lib/hooks/useNotes";
import { useFolders } from "@/lib/hooks/useFolders";
import FolderTabs from "@/components/folders/FolderTabs/FolderTabs";
import NoteList from "@/components/notes/NoteList/NoteList";
import styles from "./Home.module.scss";

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedFolderId = searchParams?.get('folderId');

  const { data: notes = [], isLoading, error } = useNotes(selectedFolderId);
  const { data: folders = [] } = useFolders();

  const allFolder = folders?.find(f => f.isSystem);

  const handleCreateNote = () => {
    const targetFolderId = selectedFolderId || allFolder?.id;
    if (targetFolderId) {
      router.push(`/notes/create?folderId=${targetFolderId}`);
    } else {
      router.push('/notes/create');
    }
  };

  const handleSelectFolder = (folderId: string | null) => {
    const url = folderId ? `/?folderId=${folderId}` : '/';
    router.push(url);
  };

  return (
    <div className={styles.container}>
      <FolderTabs
        folders={folders}
        selectedFolderId={selectedFolderId}
        onSelectFolder={handleSelectFolder}
      />

      {error && (
        <div className={styles.error}>
          Ошибка загрузки заметок: {error.message}
        </div>
      )}

      {isLoading ? (
        <div className={styles.loading}>Загрузка заметок...</div>
      ) : (
        <NoteList
          notes={notes}
          onCreateNote={handleCreateNote}
        />
      )}
    </div>
  );
}