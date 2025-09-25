"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Folder } from "@/lib/api/foldersService";
import { useFolders, useCreateFolder, useUpdateFolder, useDeleteFolder } from "@/lib/hooks/useFolders";
import FolderList from "@/components/folders/FolderList/FolderList";
import FolderModal from "@/components/folders/FolderModal/FolderModal";
import ConfirmDialog from "@/components/ui/ConfirmDialog/ConfirmDialog";
import { useConfirmDialog } from "@/components/ui/ConfirmDialog/useConfirmDialog";
import styles from "./Folders.module.scss";
import ArrowIcon from '/public/svg/arrowBack.svg';

export default function Folders() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFolder, setEditingFolder] = useState<Folder | null>(null);

  const { data: folders = [], isLoading, error } = useFolders();
  const createFolderMutation = useCreateFolder();
  const updateFolderMutation = useUpdateFolder();
  const deleteFolderMutation = useDeleteFolder();
  const { dialogState, showConfirm } = useConfirmDialog();

  const handleCreateFolder = () => {
    setEditingFolder(null);
    setIsModalOpen(true);
  };

  const handleEditFolder = (folder: Folder) => {
    setEditingFolder(folder);
    setIsModalOpen(true);
  };

  const handleDeleteFolder = async (folder: Folder) => {
    if (folder.isSystem) return;

    const confirmed = await showConfirm({
      title: 'Удалить папку',
      message: `Вы действительно хотите удалить папку "${folder.name}"? Все заметки в ней будут перемещены в папку "Все".`
    });

    if (!confirmed) return;

    deleteFolderMutation.mutate(folder.id);
  };

  const handleSaveFolder = (name: string) => {
    if (editingFolder) {
      updateFolderMutation.mutate(
        { id: editingFolder.id, data: { name } },
        {
          onSuccess: () => {
            setIsModalOpen(false);
            setEditingFolder(null);
          },
        }
      );
    } else {
      createFolderMutation.mutate(
        { name },
        {
          onSuccess: () => {
            setIsModalOpen(false);
            setEditingFolder(null);
          },
        }
      );
    }
  };

  const handleBackClick = () => {
    router.push('/');
  };

  const handleNavigateToFolder = (folder: Folder) => {
    if (folder.isSystem) {
      router.push("/");
    } else {
      router.push(`/?folderId=${folder.id}`);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingFolder(null);
  };

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Загрузка папок...</div>
      </div>
    );
  }

  const isAnyMutationLoading = createFolderMutation.isPending ||
                               updateFolderMutation.isPending ||
                               deleteFolderMutation.isPending;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button className={styles.backBtn} onClick={handleBackClick} title="К папке Все">
          <ArrowIcon/>
        </button>
        <h1 className={styles.title}>Управление папками</h1>
      </div>

      {error && (
        <div className={styles.error}>
          Ошибка загрузки папок: {error.message}
        </div>
      )}

      {(createFolderMutation.error || updateFolderMutation.error || deleteFolderMutation.error) && (
        <div className={styles.error}>
          Ошибка операции с папкой
        </div>
      )}

      <FolderList
        folders={folders}
        onEdit={handleEditFolder}
        onDelete={handleDeleteFolder}
        onNavigate={handleNavigateToFolder}
        onCreateFolder={handleCreateFolder}
      />

      <FolderModal
        isOpen={isModalOpen}
        folder={editingFolder}
        onClose={closeModal}
        onSave={handleSaveFolder}
      />

      <ConfirmDialog
        isOpen={dialogState.isOpen}
        title={dialogState.title}
        message={dialogState.message}
        confirmText={dialogState.confirmText}
        cancelText={dialogState.cancelText}
        onConfirm={dialogState.onConfirm}
        onCancel={dialogState.onCancel}
      />
    </div>
  );
}