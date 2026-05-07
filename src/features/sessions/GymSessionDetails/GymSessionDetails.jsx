import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { formatDate } from "../../../utils/sessionsUtils";
import layout from "../../../layout/AppLayout.module.css";
import previous from "../../../resources/previous.png";
import styles from "./GymSessionDetails.module.css";
import Button from "../../../components/ui/Button/Button";
import { formatDuration } from "../../../utils/timerUtils";

function GymSessionDetails({ sessions }) {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const session = sessions.find((s) => s.id === sessionId);

  if (!session) {
    return (
      <div className={`${layout.page} ${layout.narrow}`}>
        <div className={layout.emptyState}>
          <span>Session not found</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`${layout.page} ${layout.medium}`}>
      <header className={layout.topbar}>
        <div className={layout.titleBlock}>
          <p className={layout.overline}>Session</p>
          <h2 className={layout.title}>{session.templateName}</h2>
        </div>
        <div className={styles.duration}>
          <strong>{formatDate(session.startedAt)}</strong>
        </div>
      </header>

      <div className={layout.statsGrid}>
        <span className={layout.statCard}>
          <strong className={layout.statValue}>
            {formatDuration(session.durationMs)}
          </strong>{" "}
          duration
        </span>
        <span className={layout.statCard}>
          <strong className={layout.statValue}>
            {session.exercises.length}
          </strong>{" "}
          exercises
        </span>
        <span className={layout.statCard}>
          <strong className={layout.statValue}>
            {session.exercises.reduce(
              (total, exercise) => total + Number(exercise.sets.length || 0),
              0,
            )}
          </strong>
          sets
        </span>
        <span className={layout.statCard}>
          <strong className={layout.statValue}>
            {session.exercises.reduce(
              (total, exercise) =>
                total +
                exercise.sets.reduce(
                  (setTotal, set) =>
                    setTotal + Number(set.reps || 0) * Number(set.kg || 0),
                  0,
                ),
              0,
            )}
          </strong>
          planned kg
        </span>
      </div>

      <div>
        {session.exercises.map((exercise) => (
          <article key={exercise.id} className={styles.exerciseCard}>
            <div className={styles.exerciseHeader}>
              <div>
                <h3>{exercise.name}</h3>
                <p>{exercise.sets.length} completed sets</p>
              </div>
            </div>

            <div className={styles.setTable}>
              <div className={styles.setHeader}>
                <span>Set</span>
                <span>Reps</span>
                <span>Kg</span>
              </div>

              {exercise.sets.map((set) => (
                <div className={styles.setRow} key={set.id}>
                  <span>{set.setNumber}</span>
                  <strong>{set.reps}</strong>
                  <strong>{set.kg}</strong>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>

      <div className={styles.backButton}>
        <Button
          type="button"
          variant={"icon"}
          onClick={() => navigate("/workout/sessions")}
        >
          <img src={previous} alt="Back" />
        </Button>
      </div>
    </div>
  );
}

export default GymSessionDetails;
