import Button from "../Button/Button";
import styles from "./ConfirmDeleteModal.module.css";

function ConfirmDeleteModal({ onCancel, onDelete, type }) {
  return (
    <div className={styles.backdrop} onClick={onCancel}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.title}>
          Are you sure you want to delete this {type}?
        </div>
        <div className={styles.actions}>
          <Button onClick={onCancel}>Cancel</Button>
          <Button variant={"delete"} onClick={onDelete}>
            Delete {type}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDeleteModal;
