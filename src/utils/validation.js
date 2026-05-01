const isValidNumber = (value) => {
  return /^[1-9]\d*$/.test(value);
};

const isValidKg = (value) => {
  const str = String(value).trim();
  return /^(0|[1-9]\d*)$/.test(str);
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
      exErrors.name = "Exercise name is required";
    }

    if (!ex.sets || !isValidNumber(ex.sets)) {
      exErrors.sets = "Invalid";
    }

    if (!ex.reps || !isValidNumber(ex.reps)) {
      exErrors.reps = "Invalid";
    }

    if (!isValidKg(ex.kg)) {
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
