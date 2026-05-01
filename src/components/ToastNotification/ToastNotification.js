import { UI_STATE } from "../../GymRat";
import "./ToastNotification.css";

function ToastNotification({ type }) {
  const TYPE_CONFIG = {
    [UI_STATE.SAVE]: {
      className: "save",
      message: "Template saved!",
    },
    [UI_STATE.DELETE]: {
      className: "delete",
      message: "Template deleted!",
    },
  };

  const config = TYPE_CONFIG[type];
  if (!config) return null;

  return (
    <div className={`notification ${config.className}`}>{config.message}</div>
  );
}

export default ToastNotification;
