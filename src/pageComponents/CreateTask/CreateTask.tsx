"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCreateTask } from "@/lib/hooks/useTasks";
import styles from "./CreateTask.module.scss";

export default function CreateTask() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const createTaskMutation = useCreateTask();

  const formatDate = () => {
    const date = new Date();
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const handleBack = () => {
    router.back();
  };

  const handleSave = async () => {
    if (!title.trim()) {
      return;
    }

    try {
      await createTaskMutation.mutateAsync({
        title: title.trim()
      });
      router.back();
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      handleSave();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button className={styles.backButton} onClick={handleBack}>
          ←
        </button>
        <div className={styles.date}>{formatDate()}</div>
        <div className={styles.counter}>
          {title.length} симв.
        </div>
      </div>

      <div className={styles.content}>
        <input
          type="text"
          className={styles.titleInput}
          placeholder="Название задачи"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      </div>

      <button
        className={styles.saveBtn}
        onClick={handleSave}
        disabled={!title.trim() || createTaskMutation.isPending}
      >
        {createTaskMutation.isPending ? 'Создание...' : 'Сохранить'}
      </button>
    </div>
  );
}