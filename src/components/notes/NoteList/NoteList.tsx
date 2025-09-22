import { useRouter } from "next/navigation";
import { Note } from "@/lib/api/notesService";
import NoteCard from "@/components/notes/NoteCard/NoteCard";
import styles from "./NoteList.module.scss";
import NoteIcon from '/public/svg/note.svg'
import PlusIcon from '/public/svg/plus.svg'

type Props = {
  notes: Note[];
  onCreateNote: () => void;
};

export default function NoteList({ notes, onCreateNote }: Props) {
  const router = useRouter();

  const handleNoteClick = (noteId: string) => {
    router.push(`/notes/edit/${noteId}`);
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
                isSelected={false}
                onClick={() => handleNoteClick(note.id)}
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