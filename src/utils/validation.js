const isExerciseInvalid = (ex) => {
  const sets = Number(ex.sets);
  const reps = Number(ex.reps);
  const kg = Number(ex.kg);
  return (
    !ex.name?.trim() ||
    !Number.isFinite(sets) ||
    !Number.isFinite(reps) ||
    !Number.isFinite(kg) ||
    sets <= 0 ||
    reps <= 0 ||
    kg <= 0
  );
};

export const validateForm = (templateName, exercises, setFormErrors) => {
  const templateNameError = !templateName.trim();

  const exerciseErrors = exercises.map((ex) => ({
    ...ex,
    error: isExerciseInvalid(ex),
  }));

  const hasExerciseError = exerciseErrors.some((ex) => ex.error);

  const isValid = !templateNameError && !hasExerciseError;

  setFormErrors({
    templateName: templateNameError ? "Template name is required" : "",
    exercises: exerciseErrors,
  });

  return isValid;
};
