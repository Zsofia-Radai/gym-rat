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
  const errors = {
    templateName: "",
    exercises: {},
  };

  if (!templateName.trim()) {
    errors.templateName = "Template name is required";
  }

  exercises.forEach((ex) => {
    const exErrors = {};

    if (!ex.name.trim()) {
      exErrors.name = "Required";
    }

    if (!ex.sets || isNaN(ex.sets)) {
      exErrors.sets = "Invalid";
    }

    if (!ex.reps || isNaN(ex.reps)) {
      exErrors.reps = "Invalid";
    }

    if (!ex.kg || isNaN(ex.kg)) {
      exErrors.kg = "Invalid";
    }

    if (Object.keys(exErrors).length > 0) {
      errors.exercises[ex.id] = exErrors;
    }
  });

  const isValid =
    !errors.templateName && Object.keys(errors.exercises).length === 0;

  setFormErrors(errors);

  return isValid;
};
