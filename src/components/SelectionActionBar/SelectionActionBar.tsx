import cn from "classnames";
import styles from "./SelectionActionBar.module.scss";

type Props = {
  selectedCount: number;
  totalCount: number;
  onSelectAll: () => void;
  onDelete: () => void;
  onCancel: () => void;
  className?: string;
};

export default function SelectionActionBar({
  selectedCount,
  totalCount,
  onSelectAll,
  onDelete,
  onCancel,
  className
}: Props) {
  const isAllSelected = selectedCount === totalCount;

  return (
    <div className={cn(styles.container, className)}>
      <div className={styles.content}>
        <div className={styles.count}>
          {selectedCount} из {totalCount}
        </div>

        <div className={styles.actions}>
          <button
            className={styles.actionBtn}
            onClick={onSelectAll}
          >
            {isAllSelected ? "Снять всё" : "Выделить всё"}
          </button>

          <button
            className={cn(styles.actionBtn, styles.deleteBtn)}
            onClick={onDelete}
            disabled={selectedCount === 0}
          >
            Удалить
          </button>

          <button
            className={cn(styles.actionBtn, styles.cancelBtn)}
            onClick={onCancel}
          >
            Отменить
          </button>
        </div>
      </div>
    </div>
  );
}