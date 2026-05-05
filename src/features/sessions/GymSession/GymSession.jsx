import { useNavigate, useParams } from "react-router-dom";
import deleteIcon from "../../../resources/deleteIcon.svg";
import Button from "../../../components/ui/Button/Button";
import layout from "../../../layout/AppLayout.module.css";
import styles from "./GymSession.module.css";
import { useState } from "react";
import { useSessions } from "../../../hooks/useSessions";
import { useSessionsActions } from "../../../hooks/useSessionsActions";

function GymSession({ sessions, setSessions }) {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const session = sessions?.find((s) => s.id === sessionId);
  const {
    formSession,
    addSet,
    deleteSet,
    updateSetField,
    saveSession,
    stats
  } = useSessions(session, setSessions);

  const { deleteSession } = useSessionsActions(setSessions);

  if (!session) {
    return (
      <div className={`${layout.page} ${layout.narrow}`}>
        <div className={layout.emptyState}>
          <strong>Session not found</strong>
          <span>This workout session is no longer available.</span>
        </div>
      </div>
    );
  }

  const discardWorkout = () => {
    deleteSession(session.id);
    navigate(-1);
  };

  const handleSaveSession = (e) => {
    e.preventDefault();
    saveSession(session.id);
    navigate("/workout/sessions");
  };

  return (
    <div className={`${layout.page} ${layout.wide}`}>
      <header className={layout.topbar}>
        <div className={layout.titleBlock}>
          <p className={layout.overline}>Live workout</p>
          <h2 className={layout.title}>{formSession.templateName}</h2>
        </div>
        <Button type="button" variant="delete" onClick={() => discardWorkout()}>
          Discard
        </Button>
      </header>

      <div className={`${layout.mutedPanel} ${styles.progressCard}`}>
        <div>
          <p className={layout.overline}>Progress</p>
          <strong>
            {stats.completedSets} of {stats.totalSets} sets
          </strong>
        </div>
        <div
          className={styles.progressRing}
          style={{ "--progress": `${stats.progressPercent}%` }}
        >
          {stats.progressPercent}%
        </div>
      </div>

      <form className={styles.sessionForm} onSubmit={(e) => handleSaveSession(e)}>
        <div className={styles.exerciseGrid}>
          {formSession.exercises.map((exercise) => (
            <article key={exercise.id} className={styles.exerciseCard}>
              <header>
                <div>
                  <h3>{exercise.name}</h3>
                  <span>{exercise.sets.length} sets</span>
                </div>
              </header>
              <div className={styles.exerciseHeader}>
                <span>Set</span>
                <span>Reps</span>
                <span>Kg</span>
                <span></span>
              </div>
              <div>
                {exercise.sets.map((set, index) => (
                  <div key={set.id} className={styles.setRow}>
                    <div className={styles.setNumber}>{set.setNumber}</div>
                    <input
                      onChange={(e) =>
                        updateSetField(
                          exercise.id,
                          e.target.value,
                          set.id,
                          "reps",
                        )
                      }
                      value={set.reps}
                    ></input>
                    <input
                      onChange={(e) =>
                        updateSetField(
                          exercise.id,
                          e.target.value,
                          set.id,
                          "kg",
                        )
                      }
                      value={set.kg}
                    ></input>
                    <Button
                      type="button"
                      variant="icon"
                      onClick={() => deleteSet(exercise.id, set.id)}
                    >
                      <img src={deleteIcon} alt="Delete set" />
                    </Button>
                  </div>
                ))}
                <div className={styles.addSet}>
                  <Button type="button" onClick={() => addSet(exercise.id)}>
                    Add set
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className={styles.sessionFormButton}>
          <Button type="submit" variant="submit">
            Save session
          </Button>
        </div>
      </form>
    </div>
  );
}

export default GymSession;
