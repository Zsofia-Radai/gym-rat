export function formatDate(timestamp) {
  return new Date(timestamp).toLocaleString("hu-HU", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatDay(timestamp) {
  return new Date(timestamp).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
  });
}

export const createSession = (template) => ({
  id: crypto.randomUUID(),
  templateName: template.name,
  templateId: template.id,
  startedAt: Date.now(),
  exercises: template.exercises.map((exercise) => ({
    ...exercise,
    sets: Array.from({ length: exercise.sets }, (_, i) => ({
      id: crypto.randomUUID(),
      setNumber: i + 1,
      reps: exercise.reps,
      kg: exercise.kg,
      completed: false,
    })),
  })),
});
