"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useTasks, useDeleteTask } from "@/lib/hooks/useTasks";
import { TaskStatus } from "@/lib/api/tasksService";
import TaskStatusFilter from "@/components/tasks/TaskStatusFilter/TaskStatusFilter";
import TaskList from "@/components/tasks/TaskList/TaskList";
import SelectionActionBar from "@/components/SelectionActionBar/SelectionActionBar";
import styles from "./Tasks.module.scss";

export default function Tasks() {
  const router = useRouter();
  const [selectedStatus, setSelectedStatus] = useState<TaskStatus>('all');

  // Selection mode state
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedTasks, setSelectedTasks] = useState<Set<string>>(new Set());

  const { data: tasks = [], isLoading, error } = useTasks(selectedStatus);
  const deleteTaskMutation = useDeleteTask();

  const taskCounts = useMemo(() => {
    if (selectedStatus !== 'all') {
      return undefined;
    }

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

  // Selection mode handlers
  const handleEnterSelectionMode = (taskId: string) => {
    setIsSelectionMode(true);
    setSelectedTasks(new Set([taskId]));
  };

  const handleToggleSelection = (taskId: string) => {
    if (isSelectionMode) {
      setSelectedTasks(prev => {
        const newSet = new Set(prev);
        if (newSet.has(taskId)) {
          newSet.delete(taskId);
        } else {
          newSet.add(taskId);
        }
        return newSet;
      });
    } else {
      handleEditTask(taskId);
    }
  };

  const handleSelectAll = () => {
    const allTaskIds = tasks.map(task => task.id);
    const isAllSelected = selectedTasks.size === allTaskIds.length;

    if (isAllSelected) {
      setSelectedTasks(new Set());
    } else {
      setSelectedTasks(new Set(allTaskIds));
    }
  };

  const handleDeleteSelected = async () => {
    if (selectedTasks.size === 0) return;

    const confirmMessage = `Удалить ${selectedTasks.size} задач?`;
    if (!window.confirm(confirmMessage)) return;

    try {
      await Promise.all([...selectedTasks].map(taskId =>
        deleteTaskMutation.mutateAsync(taskId)
      ));
      setIsSelectionMode(false);
      setSelectedTasks(new Set());
    } catch (error) {
      console.error('Ошибка удаления задач:', error);
    }
  };

  const handleCancelSelection = () => {
    setIsSelectionMode(false);
    setSelectedTasks(new Set());
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
          isSelectionMode={isSelectionMode}
          selectedTasks={selectedTasks}
          onToggleSelection={handleToggleSelection}
          onEnterSelectionMode={handleEnterSelectionMode}
        />
      )}

      {isSelectionMode && (
        <SelectionActionBar
          selectedCount={selectedTasks.size}
          totalCount={tasks.length}
          onSelectAll={handleSelectAll}
          onDelete={handleDeleteSelected}
          onCancel={handleCancelSelection}
        />
      )}
    </div>
  );
}