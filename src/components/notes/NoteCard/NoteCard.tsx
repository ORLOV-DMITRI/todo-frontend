import cn from "classnames";
import { Note } from "@/lib/api/notesService";
import styles from "./NoteCard.module.scss";

type Props = {
  note: Note;
  isSelected: boolean;
  onClick: () => void;
};

export default function NoteCard({ note, isSelected, onClick }: Props) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getPreview = (content: string) => {
    return content.length > 100 ? content.substring(50, 100) + '...' : content;
  };

  return (
    <div
      className={cn(styles.card, isSelected && styles.selected)}
      onClick={onClick}
    >
      <div className={styles.content}>
        <div className={styles.main}>
          <h3 className={styles.title}>{note.title}</h3>
        </div>
        <div className={styles.meta}>
          <span className={styles.date}>{formatDate(note.updatedAt)}</span>
        </div>
      </div>
    </div>
  );
}