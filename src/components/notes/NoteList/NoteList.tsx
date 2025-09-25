import { useRouter } from "next/navigation";
import { Note } from "@/lib/api/notesService";
import NoteCard from "@/components/notes/NoteCard/NoteCard";
import styles from "./NoteList.module.scss";
import NoteIcon from '/public/svg/note.svg'
import PlusIcon from '/public/svg/plus.svg'

type Props = {
  notes: Note[];
  onCreateNote: () => void;
  isSelectionMode?: boolean;
  selectedNotes?: Set<string>;
  onToggleSelection?: (noteId: string) => void;
  onEnterSelectionMode?: (noteId: string) => void;
};

export default function NoteList({
  notes,
  onCreateNote,
  isSelectionMode,
  selectedNotes,
  onToggleSelection,
  onEnterSelectionMode
}: Props) {
  const router = useRouter();

  const handleNoteClick = (noteId: string) => {
    if (onToggleSelection) {
      onToggleSelection(noteId);
    } else {
      router.push(`/notes/edit/${noteId}`);
    }
  };

  const handleNoteLongPress = (noteId: string) => {
    if (onEnterSelectionMode) {
      onEnterSelectionMode(noteId);
    }
  };

  return (
    <div className={styles.container}>
      {(notes?.length || 0) === 0 ? (
        <div className={styles.empty}>
          <div className={styles.emptyIcon}>
            <NoteIcon/>
          </div>
          <p className={styles.emptyText}>Нет заметок</p>
        </div>
      ) : (
        <>
          <div className={styles.list}>
            {(notes || []).map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                isSelected={selectedNotes?.has(note.id) || false}
                onClick={() => handleNoteClick(note.id)}
                onLongPress={() => handleNoteLongPress(note.id)}
                isSelectionMode={isSelectionMode}
              />
            ))}
          </div>
        </>
      )}
      <button className={styles.create} onClick={onCreateNote} >
        <PlusIcon/>
      </button>
    </div>
  );
}