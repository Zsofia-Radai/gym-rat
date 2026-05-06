import { useEffect, useState } from "react";

export function useSessions(session, setSessions) {
  const [formSession, setFormSession] = useState(session);

  const createSet = (setNumber) => ({
    id: crypto.randomUUID(),
    setNumber: setNumber + 1,
    reps: 0,
    kg: 0,
    completed: false,
  });

  const discardWorkout = (sessionId) => {
    setSessions((prev) => prev.filter((s) => s.id !== sessionId));
  };

  const toggleSetCompleted = (exerciseId, setId) => {
    setFormSession((prev) => ({
      ...prev,
      exercises: prev.exercises.map((exercise) =>
        exercise.id !== exerciseId
          ? exercise
          : {
              ...exercise,
              sets: exercise.sets.map((set) =>
                set.id !== setId
                  ? set
                  : {
                      ...set,
                      completed: !set.completed,
                    },
              ),
            },
      ),
    }));
  };

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

  function sanitizeReps(value) {
    let digits = value.replace(/\D/g, "");
    if (digits === "") return "0";
    if (/^0+$/.test(digits)) return "0";
    return digits.replace(/^0+/, "");
  }

  function sanitizeKg(value) {
    let cleaned = value.replace(/[^\d.]/g, "");
    const parts = cleaned.split(".");
    if (parts.length > 2) {
      cleaned = parts[0] + "." + parts.slice(1).join("");
    }
    if (cleaned === "" || cleaned === ".") return "0";
    if (!cleaned.startsWith("0.")) {
      cleaned = cleaned.replace(/^0+/, "");
    }
    return cleaned || "0";
  }

  function cleanValue(value, field) {
    if (field === "kg") {
      return sanitizeKg(value);
    }
    if (field === "reps") {
      return sanitizeReps(value);
    }
  }

  const updateSetField = (exerciseId, value, setId, field) => {
    const cleanedValue = cleanValue(value, field);
    updateExerciseInSession(exerciseId, (exercise) =>
      updateSetinExercise(setId, exercise, (set) => ({
        ...set,
        [field]: cleanedValue,
      })),
    );
  };

  const saveSession = (sessionId) => {
    const finishedAt = Date.now();

    const updatedSession = {
      ...formSession,
      finishedAt,
      durationMs: finishedAt - formSession.startedAt,
    };

    setSessions((prev) =>
      prev.map((session) =>
        session.id === sessionId ? updatedSession : session,
      ),
    );
  };

  const totalSets =
    session?.exercises.reduce(
      (total, exercise) => total + exercise.sets.length,
      0,
    ) || 0;

  const completedSets = session?.exercises.reduce(
    (total, exercise) =>
      total + exercise.sets.filter((set) => set.completed).length,
    0,
  );

  const progressPercent = Math.round((completedSets / totalSets) * 100) || 0;

  const stats = {
    totalSets,
    completedSets,
    progressPercent,
  };

  return {
    formSession,
    addSet,
    deleteSet,
    updateSetField,
    saveSession,
    stats,
    toggleSetCompleted,
  };
}
