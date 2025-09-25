"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useNote, useUpdateNote, useDeleteNote } from "@/lib/hooks/useNotes";
import TrashIcon from '/public/svg/trash.svg';
import ArrowIcon from '/public/svg/arrowBack.svg';
import ConfirmDialog from "@/components/ui/ConfirmDialog/ConfirmDialog";
import { useConfirmDialog } from "@/components/ui/ConfirmDialog/useConfirmDialog";
import styles from "./EditNote.module.scss";

type Props = {
  noteId: string;
};

export default function EditNote({ noteId }: Props) {
  const router = useRouter();
  const { data: note, isLoading, error } = useNote(noteId);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [showTitleInput, setShowTitleInput] = useState(false);

  const updateNoteMutation = useUpdateNote();
  const deleteNoteMutation = useDeleteNote();
  const { dialogState, showConfirm } = useConfirmDialog();

  const currentDate = new Date().toLocaleDateString('ru-RU');

  useEffect(() => {
    if (note) {
      setTitle(note.title || "");
      setContent(note.content || "");
      setShowTitleInput(!!note.title);
    }
  }, [note]);

  const handleSave = async () => {
    if (!note || !content.trim()) return;

    try {
      await updateNoteMutation.mutateAsync({
        id: note.id,
        data: {
          title: title.trim() || undefined,
          content: content.trim(),
        }
      });
      router.back();
    } catch (error) {
      console.error('Ошибка обновления заметки:', error);
    }
  };

  const handleDelete = async () => {
    if (!note) return;

    const confirmed = await showConfirm({
      title: 'Удалить заметку',
      message: `Вы действительно хотите удалить заметку "${note.title || 'Без названия'}"? Это действие нельзя отменить.`
    });

    if (!confirmed) return;

    try {
      await deleteNoteMutation.mutateAsync(note.id);
      router.push('/');
    } catch (error) {
      console.error('Ошибка удаления заметки:', error);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.metaKey && e.key === 'Enter') {
      handleSave();
    }
  };

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Загрузка заметки...</div>
      </div>
    );
  }

  if (error || !note) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>Заметка не найдена</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button className={styles.backBtn} onClick={handleSave}>
          <ArrowIcon/>
        </button>
        <div className={styles.date}>{currentDate}</div>
        <button className={styles.deleteBtn} onClick={handleDelete}>
          <TrashIcon />
        </button>
      </div>

      <div className={styles.content}>
        {showTitleInput ? (
          <input
            className={styles.titleInput}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Введите заголовок..."
            onBlur={() => !title.trim() && setShowTitleInput(false)}
            autoFocus
          />
        ) : (
          <button
            className={styles.titlePlaceholder}
            onClick={() => setShowTitleInput(true)}
          >
            {title || "Заголовок"}
          </button>
        )}

        <textarea
          className={styles.textarea}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Начните писать вашу заметку..."
          onKeyDown={handleKeyDown}
          autoFocus={!showTitleInput}
        />
      </div>

      {content.trim() && (
        <button
          className={styles.saveBtn}
          onClick={handleSave}
          disabled={updateNoteMutation.isPending}
        >
          {updateNoteMutation.isPending ? 'Сохранение...' : 'Сохранить'}
        </button>
      )}

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