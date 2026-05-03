import { useNavigate, useParams } from "react-router-dom";
import deleteIcon from "../../resources/deleteIcon.svg";
import Button from "../Button/Button";
import styles from "./GymSession.module.css";
import { useEffect, useState } from "react";

function GymSession({ sessions, setSessions }) {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const session = sessions?.find((s) => s.id === sessionId);
  const [formSession, setFormSession] = useState(session);

  useEffect(() => {
    console.log("sessions updated:", sessions);
  }, [sessions]);

  if (!session) {
    return <div className="page">Session not found!</div>;
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

  return (
    <div className="page">
      <div className="template-details-header">
        <div>Log workout</div>
        <Button type="button" variant="delete" onClick={() => discardWorkout()}>
          Discard workout
        </Button>
      </div>
      <hr></hr>
      <form onSubmit={(e) => saveSession(e)}>
        {formSession.exercises.map((exercise) => (
          <div key={exercise.id} className={styles.exerciseName}>
            <div>{exercise.name}</div>
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
                    type="icon"
                    variant="icon"
                    onClick={() => deleteSet(exercise.id, set.id)}
                  >
                    <img src={deleteIcon} alt="Delete set" />
                  </Button>
                </div>
              ))}
              <Button type="button" onClick={() => addSet(exercise.id)}>
                Add set
              </Button>
            </div>
          </div>
        ))}
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
