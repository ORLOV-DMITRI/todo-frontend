import { useState, useEffect } from "react";
import { Folder } from "@/lib/api/foldersService";
import FolderCard from "../FolderCard/FolderCard";
import CreateFolderCard from "../CreateFolderCard/CreateFolderCard";
import styles from "./FolderList.module.scss";

type Props = {
  folders: Folder[];
  onEdit: (folder: Folder) => void;
  onDelete: (folder: Folder) => void;
  onNavigate: (folder: Folder) => void;
  onCreateFolder: () => void;
};

export default function FolderList({ folders, onEdit, onDelete, onNavigate, onCreateFolder }: Props) {
  const [selectedFolder, setSelectedFolder] = useState<Folder | null>(null);

  useEffect(() => {
    if (selectedFolder && !folders?.find(folder => folder.id === selectedFolder.id)) {
      setSelectedFolder(null);
    }
  }, [folders, selectedFolder]);

  const handleFolderClick = (folder: Folder) => {
    setSelectedFolder(selectedFolder?.id === folder.id ? null : folder);
  };

  const handleFolderDoubleClick = (folder: Folder) => {
    onNavigate(folder);
  };

  const handleEdit = () => {
    if (selectedFolder) {
      onEdit(selectedFolder);
    }
  };

  const handleDelete = () => {
    if (selectedFolder) {
      onDelete(selectedFolder);
    }
  };

  const canModify = selectedFolder && !selectedFolder.isSystem;

  return (
    <div className={styles.container}>
      <div className={styles.list}>
        {(folders || []).map((folder) => (
          <FolderCard
            key={folder.id}
            folder={folder}
            isSelected={selectedFolder?.id === folder.id}
            onClick={() => handleFolderClick(folder)}
            onDoubleClick={() => handleFolderDoubleClick(folder)}
          />
        ))}

        {!selectedFolder && (
            <CreateFolderCard onClick={onCreateFolder} />
        )}

      </div>

      {selectedFolder && (
        <div className={styles.actions}>
          {canModify && (
            <button className={styles.actionBtn} onClick={handleEdit}>
              Изменить
            </button>
          )}
          {canModify && (
            <button className={styles.actionBtn} onClick={handleDelete}>
              Удалить
            </button>
          )}
        </div>
      )}
    </div>
  );
}