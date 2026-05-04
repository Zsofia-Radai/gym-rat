import Button from "../../../components/ui/Button/Button";
import layout from "../../../layout/AppLayout.module.css";
import deleteIcon from "../../../resources/deleteIcon.svg";
import styles from "./GymSessions.module.css";

function WorkoutSessions({ sessions, setSessions }) {
  function formatDate(timestamp) {
    return new Date(timestamp).toLocaleString("hu-HU", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  function formatDay(timestamp) {
    return new Date(timestamp).toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
    });
  }

  const sortedSessions = [...sessions].sort(
    (a, b) => b.startedAt - a.startedAt,
  );

  const deleteSession = (sessionId) => {
    setSessions((prev) => {
      const updatedSessions = prev.filter(
        (session) => session.id !== sessionId,
      );
      localStorage.setItem("sessions", JSON.stringify(updatedSessions));
      return updatedSessions;
    });
  };

  const totalVolume = sessions.reduce(
    (sessionTotal, session) =>
      sessionTotal +
      session.exercises.reduce(
        (exerciseTotal, exercise) =>
          exerciseTotal +
          exercise.sets.reduce(
            (setTotal, set) =>
              setTotal + Number(set.reps || 0) * Number(set.kg || 0),
            0,
          ),
        0,
      ),
    0,
  );

  return (
    <div>
      <div className={`${layout.mutedPanel} ${styles.summary}`}>
        <article>
          <span>Total sessions</span>
          <strong>{sessions.length}</strong>
        </article>
        <article>
          <span>Volume</span>
          <strong>{Math.round(totalVolume / 100) / 10}t</strong>
        </article>
      </div>

      <div className={styles.sectionTitle}>
        <h3>Sessions</h3>
        <span>{sortedSessions.length}</span>
      </div>

      {sortedSessions.length === 0 && (
        <div className={layout.emptyState}>
          <strong>No sessions yet</strong>
          <span>Finished workouts will show up here.</span>
        </div>
      )}

      <div className={styles.sessionList}>
        {sortedSessions.map((session) => (
          <div className={styles.session} key={session.id}>
            <span className={styles.dateChip}>
              {formatDay(session.startedAt)}
            </span>
            <span>
              <span className={styles.sessionName}>{session.templateName}</span>
              <span className={styles.sessionMeta}>
                {formatDate(session.startedAt)}
              </span>
            </span>
            <Button
              type="button"
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
