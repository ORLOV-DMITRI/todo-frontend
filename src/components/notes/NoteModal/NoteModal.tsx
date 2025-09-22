import { useState, useEffect } from "react";
import { Note } from "@/lib/api/notesService";
import { Folder } from "@/lib/api/foldersService";
import Input from "@/components/ui/Input/Input";
import Button from "@/components/ui/Button/Button";
import styles from "./NoteModal.module.scss";

type Props = {
  isOpen: boolean;
  note?: Note | null;
  folders: Folder[];
  currentFolderId?: string | null;
  onClose: () => void;
  onSave: (data: { content: string; folderId?: string | null }) => void;
};

export default function NoteModal({ isOpen, note, folders, currentFolderId, onClose, onSave }: Props) {
  const [content, setContent] = useState("");
  const [folderId, setFolderId] = useState<string | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      setContent(note?.content || "");
      setFolderId(note?.folderId ?? currentFolderId ?? null);
      setError("");
    }
  }, [isOpen, note, currentFolderId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!content.trim()) {
      setError("Содержимое заметки обязательно");
      return;
    }

    onSave({
      content: content.trim(),
      folderId: folderId,
    });
  };

  const handleClose = () => {
    setContent("");
    setFolderId(null);
    setError("");
    onClose();
  };

  if (!isOpen) return null;

  const isEdit = !!note;

  return (
    <div className={styles.overlay} onClick={handleClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            {isEdit ? "Редактировать заметку" : "Создать заметку"}
          </h2>
          <button className={styles.closeBtn} onClick={handleClose}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label className={styles.label}>Папка</label>
            <select
              className={styles.select}
              value={folderId || ""}
              onChange={(e) => setFolderId(e.target.value ? e.target.value : null)}
            >
              <option value="">Все</option>
              {(folders || [])
                .filter(folder => !folder.isSystem)
                .map((folder) => (
                  <option key={folder.id} value={folder.id}>
                    {folder.name}
                  </option>
                ))}
            </select>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Содержимое заметки</label>
            <textarea
              className={styles.textarea}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Начните писать вашу заметку..."
              rows={8}
              autoFocus
            />
            {error && <div className={styles.error}>{error}</div>}
          </div>

          <div className={styles.info}>
            💡 Название заметки создается автоматически из первых слов содержимого
          </div>

          <div className={styles.actions}>
            <Button variant="secondary" onClick={handleClose}>
              Отмена
            </Button>
            <Button type="submit" variant="primary">
              {isEdit ? "Сохранить" : "Создать"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}