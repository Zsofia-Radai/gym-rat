export function useSessionsList(sessions) {
  const sortedSessions = [...sessions].sort(
    (a, b) => b.startedAt - a.startedAt,
  );

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

  return {
    sortedSessions,
    totalVolume,
  };
}
