import cn from "classnames";
import { Folder } from "@/lib/api/foldersService";
import styles from "./FolderCard.module.scss";

type Props = {
  folder: Folder;
  isSelected: boolean;
  onClick: () => void;
  onDoubleClick: () => void;
};

export default function FolderCard({ folder, isSelected, onClick, onDoubleClick }: Props) {
  return (
    <div
      className={cn(styles.card, isSelected && styles.selected)}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
    >
      <div className={styles.icon}>📁</div>
      <div className={styles.content}>
        <h3 className={styles.name}>{folder.name}</h3>
        <span className={styles.count}>
          ({folder._count.notes} {folder._count.notes === 1 ? 'заметка' : 'заметок'})
        </span>
      </div>
    </div>
  );
}