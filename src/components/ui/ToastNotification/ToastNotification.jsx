import { UI_STATE } from "../../../features/templates/Templates";
import styles from "./ToastNotification.module.css";

function ToastNotification({ type }) {
  const TYPE_CONFIG = {
    [UI_STATE.SAVE]: {
      className: styles.save,
      message: "Template saved!",
    },
    [UI_STATE.DELETE]: {
      className: styles.delete,
      message: "Template deleted!",
    },
  };

  const config = TYPE_CONFIG[type];
  if (!config) return null;

  return (
    <div className={`${styles.notification} ${config.className}`}>
      {config.message}
    </div>
  );
}

export default ToastNotification;
