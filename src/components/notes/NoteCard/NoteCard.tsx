import cn from "classnames";
import { Note } from "@/lib/api/notesService";
import styles from "./NoteCard.module.scss";

type Props = {
  note: Note;
  isSelected: boolean;
  onClick: () => void;
  onLongPress?: () => void;
  isSelectionMode?: boolean;
};

export default function NoteCard({ note, isSelected, onClick, onLongPress, isSelectionMode }: Props) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleMouseDown = () => {
    if (!isSelectionMode && onLongPress) {
      const timer = setTimeout(() => {
        onLongPress();
      }, 500);

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

  const getPreview = (content: string) => {
    return content.length > 100 ? content.substring(50, 100) + '...' : content;
  };

  return (
    <div
      className={cn(styles.card, isSelected && styles.selected)}
      onClick={onClick}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      <div className={styles.content}>
        <div className={styles.main}>
          <h3 className={styles.title}>{note.title}</h3>
        </div>
        <div className={styles.meta}>
          <span className={styles.date}>{formatDate(note.updatedAt)}</span>
        </div>
      </div>
      <div className={styles.info}>
        <div className={styles.folder}>{note.folder?.name}</div>
      </div>

      {isSelectionMode && (
        <div className={styles.checkbox}>
          <div className={cn(styles.checkboxCircle, isSelected && styles.checked)}>
            {isSelected && <span className={styles.checkmark}>✓</span>}
          </div>
        </div>
      )}
    </div>
  );
}