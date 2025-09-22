import { Task } from "@/lib/api/tasksService";
import { useToggleTask } from "@/lib/hooks/useTasks";
import TaskCard from "../TaskCard/TaskCard";
import styles from "./TaskList.module.scss";
import TaskIcon from '/public/svg/task.svg'
import PlusIcon from '/public/svg/plus.svg'

type Props = {
  tasks: Task[];
  onCreateTask: () => void;
  onEditTask?: (taskId: string) => void;
};

export default function TaskList({ tasks, onCreateTask, onEditTask }: Props) {
  const toggleTaskMutation = useToggleTask();

  const handleToggle = (taskId: string) => {
    toggleTaskMutation.mutate(taskId);
  };

  const handleTaskClick = (taskId: string) => {
    if (onEditTask) {
      onEditTask(taskId);
    }
  };

  return (
    <div className={styles.container}>
      {(tasks?.length || 0) === 0 ? (
        <div className={styles.empty}>
          <div className={styles.emptyIcon}>
            <TaskIcon/>
          </div>
          <p className={styles.emptyText}>Нет задач</p>
        </div>
      ) : (
        <div className={styles.list}>
          {(tasks || []).map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onToggle={handleToggle}
              onClick={() => handleTaskClick(task.id)}
            />
          ))}
        </div>
      )}
      <button className={styles.create} onClick={onCreateTask} >
        <PlusIcon/>
      </button>
    </div>
  );
}
