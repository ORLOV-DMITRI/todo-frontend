"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useNotes, useDeleteNote } from "@/lib/hooks/useNotes";
import { useFolders } from "@/lib/hooks/useFolders";
import FolderTabs from "@/components/folders/FolderTabs/FolderTabs";
import NoteList from "@/components/notes/NoteList/NoteList";
import SelectionActionBar from "@/components/SelectionActionBar/SelectionActionBar";
import styles from "./Home.module.scss";

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedFolderId = searchParams?.get('folderId');

  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedNotes, setSelectedNotes] = useState<Set<string>>(new Set());

  const { data: notes = [], isLoading, error } = useNotes(selectedFolderId);
  const { data: folders = [] } = useFolders();
  const deleteNoteMutation = useDeleteNote();

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


  const handleEnterSelectionMode = (noteId: string) => {
    setIsSelectionMode(true);
    setSelectedNotes(new Set([noteId]));
  };

  const handleToggleSelection = (noteId: string) => {
    if (isSelectionMode) {
      setSelectedNotes(prev => {
        const newSet = new Set(prev);
        if (newSet.has(noteId)) {
          newSet.delete(noteId);
        } else {
          newSet.add(noteId);
        }
        return newSet;
      });
    } else {
      router.push(`/notes/edit/${noteId}`);
    }
  };

  const handleSelectAll = () => {
    const allNoteIds = notes.map(note => note.id);
    const isAllSelected = selectedNotes.size === allNoteIds.length;

    if (isAllSelected) {
      setSelectedNotes(new Set());
    } else {
      setSelectedNotes(new Set(allNoteIds));
    }
  };

  const handleDeleteSelected = async () => {
    if (selectedNotes.size === 0) return;

    const confirmMessage = `Удалить ${selectedNotes.size} заметок?`;
    if (!window.confirm(confirmMessage)) return;

    try {
      await Promise.all([...selectedNotes].map(noteId =>
        deleteNoteMutation.mutateAsync(noteId)
      ));
      setIsSelectionMode(false);
      setSelectedNotes(new Set());
    } catch (error) {
      console.error('Ошибка удаления заметок:', error);
    }
  };

  const handleCancelSelection = () => {
    setIsSelectionMode(false);
    setSelectedNotes(new Set());
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
          isSelectionMode={isSelectionMode}
          selectedNotes={selectedNotes}
          onToggleSelection={handleToggleSelection}
          onEnterSelectionMode={handleEnterSelectionMode}
        />
      )}

      {isSelectionMode && (
        <SelectionActionBar
          selectedCount={selectedNotes.size}
          totalCount={notes.length}
          onSelectAll={handleSelectAll}
          onDelete={handleDeleteSelected}
          onCancel={handleCancelSelection}
        />
      )}
    </div>
  );
}