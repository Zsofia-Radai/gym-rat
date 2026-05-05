export function useSessionsActions(setSessions) {
  const deleteSession = (sessionId) => {
    setSessions((prev) => prev.filter((session) => session.id !== sessionId));
  };

  return {
    deleteSession,
  };
}
