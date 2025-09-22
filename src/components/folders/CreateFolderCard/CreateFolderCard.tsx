import styles from "./CreateFolderCard.module.scss";

type Props = {
  onClick: () => void;
};

export default function CreateFolderCard({ onClick }: Props) {
  return (
    <div className={styles.wrapper}>
        <div className={styles.card} onClick={onClick}>
            <div className={styles.icon}>+</div>
            <div className={styles.content}>
                <span className={styles.text}>Создать папку</span>
            </div>
        </div>
    </div>
  );
}