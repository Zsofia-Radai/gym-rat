import { useNavigate, useParams } from "react-router-dom";
import deleteIcon from "../../../resources/deleteIcon.svg";
import Button from "../../../components/ui/Button/Button";
import layout from "../../../layout/AppLayout.module.css";
import styles from "./GymSession.module.css";
import { useState } from "react";

function GymSession({ sessions, setSessions }) {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const session = sessions?.find((s) => s.id === sessionId);
  const [formSession, setFormSession] = useState(session);

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
    setSessions((prev) => {
      const updatedSessions = prev.filter((s) => s.id !== sessionId);
      localStorage.setItem("sessions", JSON.stringify(updatedSessions));
      return updatedSessions;
    });
    navigate(-1);
  };

  const createSet = (setNumber) => ({
    id: crypto.randomUUID(),
    setNumber: setNumber + 1,
    reps: 0,
    kg: 0,
    completed: false,
  });

  function updateExerciseInSession(exerciseId, updateExercise) {
    setFormSession((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        exercises: prev.exercises.map((exercise) => {
          if (exercise.id !== exerciseId) return exercise;
          return updateExercise(exercise);
        }),
      };
    });
  }

  function updateSetinExercise(setId, exercise, updatedSet) {
    return {
      ...exercise,
      sets: exercise.sets.map((set) => {
        if (set.id !== setId) return set;

        return updatedSet(set);
      }),
    };
  }

  const addSet = (exerciseId) => {
    updateExerciseInSession(exerciseId, (exercise) => ({
      ...exercise,
      sets: [...exercise.sets, createSet(exercise.sets.length)],
    }));
  };

  const deleteSet = (exerciseId, setId) => {
    updateExerciseInSession(exerciseId, (exercise) => {
      const updatedSets = exercise.sets
        .filter((s) => s.id !== setId)
        .map((set, index) => ({
          ...set,
          setNumber: index + 1,
        }));

      return {
        ...exercise,
        sets: updatedSets,
      };
    });
  };

  const handleSessionFieldsChange = (exerciseId, value, setId, field) => {
    updateExerciseInSession(exerciseId, (exercise) =>
      updateSetinExercise(setId, exercise, (set) => ({
        ...set,
        [field]: value,
      })),
    );
  };

  const saveSession = (e) => {
    e.preventDefault();
    setSessions((prev) =>
      prev.map((session) => (session.id === sessionId ? formSession : session)),
    );
    navigate("/workout/sessions");
  };

  const totalSets =
    formSession.exercises.reduce(
      (total, exercise) => total + exercise.sets.length,
      0,
    ) || 0;
  const completedSets = formSession.exercises.reduce(
    (total, exercise) =>
      total + exercise.sets.filter((set) => set.completed).length,
    0,
  );
  const progressPercent = Math.round((completedSets / totalSets) * 100) || 0;

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
            {completedSets} of {totalSets} sets
          </strong>
        </div>
        <div
          className={styles.progressRing}
          style={{ "--progress": `${progressPercent}%` }}
        >
          {progressPercent}%
        </div>
      </div>

      <form className={styles.sessionForm} onSubmit={(e) => saveSession(e)}>
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
                        handleSessionFieldsChange(
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
                        handleSessionFieldsChange(
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
