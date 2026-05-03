import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import styles from "./WorkoutSession.module.css";
import previous from "../../resources/previous.png";
import deleteIcon from "../../resources/deleteIcon.svg";

function WorkoutSessions({ sessions, setSessions }) {
  const navigate = useNavigate();

  function formatDate(timestamp) {
    return new Date(timestamp).toLocaleString("hu-HU", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  const sortedSessions = [...sessions].sort(
    (a, b) => b.startedAt - a.startedAt,
  );

  const deleteSession = (sessionId) => {
    setSessions((prev) => prev.filter((session) => session.id !== sessionId));
  };

  return (
    <div className="page">
      <div className={styles.header}>
        <Button type="icon" variant={"icon"} onClick={() => navigate("/")}>
          <img src={previous} alt="Back" />
        </Button>
        <h2>Workout sessions</h2>
      </div>
      <div>
        {sortedSessions.map((session) => (
          <div className={styles.session} key={session.id}>
            <div>
              {formatDate(session.startedAt)} - {session.templateName}
            </div>
            <Button
              type="icon"
              variant="icon"
              onClick={(e) => {
                e.preventDefault();
                deleteSession(session.id);
              }}
            >
              <img src={deleteIcon} alt="Delete template" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WorkoutSessions;
