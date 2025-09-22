import { useState, useEffect } from "react";
import { Folder } from "@/lib/api/foldersService";
import Input from "@/components/ui/Input/Input";
import Button from "@/components/ui/Button/Button";
import styles from "./FolderModal.module.scss";

type Props = {
  isOpen: boolean;
  folder?: Folder | null;
  onClose: () => void;
  onSave: (name: string) => void;
};

export default function FolderModal({ isOpen, folder, onClose, onSave }: Props) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      setName(folder?.name || "");
      setError("");
    }
  }, [isOpen, folder]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("Название папки обязательно");
      return;
    }

    onSave(name.trim());
  };

  const handleClose = () => {
    setName("");
    setError("");
    onClose();
  };

  if (!isOpen) return null;

  const isEdit = !!folder;

  return (
    <div className={styles.overlay} onClick={handleClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            {isEdit ? "Редактировать папку" : "Создать папку"}
          </h2>
          <button className={styles.closeBtn} onClick={handleClose}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <Input
            label="Название папки"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={error}
            placeholder="Введите название папки"
            autoFocus
          />

          <div className={styles.actions}>
            <Button variant="secondary" onClick={handleClose}>
              Отмена
            </Button>
            <Button type="submit" variant="primary" >
              {isEdit ? "Сохранить" : "Создать"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}