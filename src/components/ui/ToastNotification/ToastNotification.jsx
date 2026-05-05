import { TOAST_TYPE } from "../../../App";
import styles from "./ToastNotification.module.css";

function ToastNotification({ message, type }) {
  const toastStyle =
  type === TOAST_TYPE.SAVE
    ? styles.save
    : type === TOAST_TYPE.DELETE
    ? styles.delete
    : "";

  return (
    <div className={`${styles.notification} ${toastStyle}`}>
      {message}
    </div>
  );
}

export default ToastNotification;
