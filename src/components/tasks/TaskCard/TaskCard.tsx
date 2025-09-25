import cn from "classnames";
import { Task } from "@/lib/api/tasksService";
import styles from "./TaskCard.module.scss";

type Props = {
  task: Task;
  onToggle: (id: string) => void;
  onClick?: () => void;
  onLongPress?: () => void;
  isSelectionMode?: boolean;
  isSelected?: boolean;
};

export default function TaskCard({ task, onToggle, onClick, onLongPress, isSelectionMode, isSelected }: Props) {
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

  const handleMouseDown = () => {
    if (!isSelectionMode && onLongPress) {
      const timer = setTimeout(() => {
        onLongPress();
      }, 500); // 500ms для long press

      const handleMouseUp = () => {
        clearTimeout(timer);
        document.removeEventListener('mouseup', handleMouseUp);
      };

      document.addEventListener('mouseup', handleMouseUp);
    }
  };

  const handleTouchStart = () => {
    if (!isSelectionMode && onLongPress) {
      const timer = setTimeout(() => {
        onLongPress();
      }, 500);

      const handleTouchEnd = () => {
        clearTimeout(timer);
        document.removeEventListener('touchend', handleTouchEnd);
      };

      document.addEventListener('touchend', handleTouchEnd);
    }
  };

  return (
    <div
      className={cn(
        styles.card,
        task.completed && styles.completed,
        isSelected && styles.selected
      )}
      onClick={onClick}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
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

      {isSelectionMode && (
        <div className={styles.selectionCheckbox}>
          <div className={cn(styles.selectionCheckboxCircle, isSelected && styles.selectedCircle)}>
            {isSelected && <span className={styles.selectionCheckmark}>✓</span>}
          </div>
        </div>
      )}
    </div>
  );
}