"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useTasks } from "@/lib/hooks/useTasks";
import { TaskStatus } from "@/lib/api/tasksService";
import TaskStatusFilter from "@/components/tasks/TaskStatusFilter/TaskStatusFilter";
import TaskList from "@/components/tasks/TaskList/TaskList";
import styles from "./Tasks.module.scss";

export default function Tasks() {
  const router = useRouter();
  const [selectedStatus, setSelectedStatus] = useState<TaskStatus>('all');

  const { data: tasks = [], isLoading, error } = useTasks(selectedStatus);

  const taskCounts = useMemo(() => {
    if (selectedStatus !== 'all') {
      // При фильтрации не показываем счетчики для других статусов
      return undefined;
    }

    // Загружаем все задачи для подсчета
    const allTasks = tasks;
    return {
      all: allTasks.length,
      active: allTasks.filter(task => !task.completed).length,
      completed: allTasks.filter(task => task.completed).length,
    };
  }, [tasks, selectedStatus]);

  const handleCreateTask = () => {
    router.push('/tasks/create');
  };

  const handleEditTask = (taskId: string) => {
    router.push(`/tasks/edit/${taskId}`);
  };

  return (
    <div className={styles.container}>
      <TaskStatusFilter
        selectedStatus={selectedStatus}
        onSelectStatus={setSelectedStatus}
        taskCounts={taskCounts}
      />

      {error && (
        <div className={styles.error}>
          Ошибка загрузки задач: {error.message}
        </div>
      )}

      {isLoading ? (
        <div className={styles.loading}>Загрузка задач...</div>
      ) : (
        <TaskList
          tasks={tasks}
          onCreateTask={handleCreateTask}
          onEditTask={handleEditTask}
        />
      )}
    </div>
  );
}