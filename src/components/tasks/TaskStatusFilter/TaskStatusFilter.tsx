import cn from "classnames";
import { TaskStatus } from "@/lib/api/tasksService";
import styles from "./TaskStatusFilter.module.scss";

type Props = {
  selectedStatus: TaskStatus;
  onSelectStatus: (status: TaskStatus) => void;
  taskCounts?: {
    all: number;
    active: number;
    completed: number;
  };
};

export default function TaskStatusFilter({ selectedStatus, onSelectStatus, taskCounts }: Props) {
  const filters = [
    { key: 'all' as TaskStatus, label: 'Все', count: taskCounts?.all },
    { key: 'active' as TaskStatus, label: 'Активные', count: taskCounts?.active },
    { key: 'completed' as TaskStatus, label: 'Завершенные', count: taskCounts?.completed },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.filters}>
        {filters.map((filter) => (
          <button
            key={filter.key}
            className={cn(styles.filter, selectedStatus === filter.key && styles.active)}
            onClick={() => onSelectStatus(filter.key)}
          >
            <span className={styles.label}>{filter.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}