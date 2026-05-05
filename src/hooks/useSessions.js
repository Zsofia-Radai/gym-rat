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

  const updateSetField = (exerciseId, value, setId, field) => {
    updateExerciseInSession(exerciseId, (exercise) =>
      updateSetinExercise(setId, exercise, (set) => ({
        ...set,
        [field]: value,
      })),
    );
  };

  const saveSession = (sessionId) => {
    setSessions((prev) =>
      prev.map((session) => (session.id === sessionId ? formSession : session)),
    );
  };

  const deleteSession = (sessionId) => {
    setSessions((prev) => prev.filter((session) => session.id !== sessionId));
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
    deleteSession,
    stats,
  };
}
