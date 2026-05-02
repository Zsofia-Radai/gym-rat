import Button from "../Button/Button";
import "./ConfirmDeleteModal.css";

function ConfirmDeleteModal({ onCancel, onDelete }) {
  return (
    <div className="backdrop" onClick={onCancel}>
      <div className="modal">
        <div className="delete-modal-title">
          Are you sure you want to delete this template?
        </div>
        <div className="form-buttons">
          <Button onClick={onCancel}>Cancel</Button>
          <Button variant={"delete"} onClick={onDelete}>
            Delete routine
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDeleteModal;
