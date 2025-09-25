"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCreateNote } from "@/lib/hooks/useNotes";
import styles from "./CreateNote.module.scss";
import ArrowIcon from '/public/svg/arrowBack.svg';

export default function CreateNote() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const folderId = searchParams?.get('folderId');
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [showTitleInput, setShowTitleInput] = useState(false);

  const createNoteMutation = useCreateNote();

  const currentDate = new Date().toLocaleDateString('ru-RU');
  const characterCount = content.length;

  const handleSave = async () => {
    if (!content.trim()) {
      router.back();
      return
    }

    try {
      await createNoteMutation.mutateAsync({
        title: title.trim() || undefined,
        content: content.trim(),
        folderId: folderId ? folderId : undefined,
      });
      router.back();
    } catch (error) {
      console.error('Ошибка создания заметки:', error);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.metaKey && e.key === 'Enter') {
      handleSave();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button className={styles.backBtn} onClick={handleSave}>
          <ArrowIcon/>
        </button>
        <div className={styles.date}>{currentDate}</div>
        <div className={styles.charCount}>{characterCount} символов</div>
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
            Заголовок
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
          disabled={createNoteMutation.isPending}
        >
          {createNoteMutation.isPending ? 'Сохранение...' : 'Сохранить'}
        </button>
      )}
    </div>
  );
}