import cn from "classnames";
import { Task } from "@/lib/api/tasksService";
import styles from "./TaskCard.module.scss";

type Props = {
  task: Task;
  onToggle: (id: string) => void;
  onClick?: () => void;
};

export default function TaskCard({ task, onToggle, onClick }: Props) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleToggleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggle(task.id);
  };

  return (
    <div
      className={cn(styles.card, task.completed && styles.completed)}
      onClick={onClick}
    >
      <div className={styles.content}>
        <button
          className={cn(styles.checkbox, task.completed && styles.checked)}
          onClick={handleToggleClick}
        >
          {task.completed && <span className={styles.checkmark}>✓</span>}
        </button>

        <div className={styles.main}>
          <h3 className={cn(styles.title, task.completed && styles.strikethrough)}>
            {task.title}
          </h3>
          <span className={styles.date}>{formatDate(task.updatedAt)}</span>
        </div>
      </div>
    </div>
  );
}