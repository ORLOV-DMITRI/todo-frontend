"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTask, useUpdateTask, useDeleteTask } from "@/lib/hooks/useTasks";
import TrashIcon from '/public/svg/trash.svg';
import styles from "./EditTask.module.scss";
import ArrowIcon from '/public/svg/arrowBack.svg';
import ConfirmDialog from "@/components/ui/ConfirmDialog/ConfirmDialog";
import { useConfirmDialog } from "@/components/ui/ConfirmDialog/useConfirmDialog";

type Props = {
  taskId: string;
};

export default function EditTask({ taskId }: Props) {
  const router = useRouter();
  const { data: task, isLoading, error } = useTask(taskId);
  const [title, setTitle] = useState("");

  const updateTaskMutation = useUpdateTask();
  const deleteTaskMutation = useDeleteTask();
  const { dialogState, showConfirm } = useConfirmDialog();

  const currentDate = new Date().toLocaleDateString('ru-RU');

  useEffect(() => {
    if (task) {
      setTitle(task.title || "");
    }
  }, [task]);

  const handleSave = async () => {
    if (!task || !title.trim()) return;

    try {
      await updateTaskMutation.mutateAsync({
        id: task.id,
        data: {
          title: title.trim(),
        }
      });
      router.back();
    } catch (error) {
      console.error('Ошибка обновления задачи:', error);
    }
  };

  const handleDelete = async () => {
    if (!task) return;

    const confirmed = await showConfirm({
      title: 'Удалить задачу',
      message: `Вы действительно хотите удалить задачу "${task.title}"? Это действие нельзя отменить.`
    });

    if (!confirmed) return;

    try {
      await deleteTaskMutation.mutateAsync(task.id);
      router.push('/tasks');
    } catch (error) {
      console.error('Ошибка удаления задачи:', error);
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
        <div className={styles.loading}>Загрузка задачи...</div>
      </div>
    );
  }

  if (error || !task) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>Задача не найдена</div>
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
        <textarea
          className={styles.textarea}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Название задачи..."
          onKeyDown={handleKeyDown}
          autoFocus
        />
      </div>

      {title.trim() && (
        <button
          className={styles.saveBtn}
          onClick={handleSave}
          disabled={updateTaskMutation.isPending}
        >
          {updateTaskMutation.isPending ? 'Сохранение...' : 'Сохранить'}
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