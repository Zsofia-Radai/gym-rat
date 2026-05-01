import { useState } from "react";
import { createNewExercise } from "../utils/templateFormUtils";

export function useExercises(initialExercises = []) {
  const [exercises, setExercises] = useState(initialExercises);
  const [formErrors, setFormErrors] = useState({
    templateName: "",
    exercises: {},
  });

  const addExercise = () => {
    setExercises((prev) => [...prev, createNewExercise()]);
  };

  const deleteExercise = (id) => {
    setExercises((prev) => prev.filter((ex) => ex.id !== id));
  };

  const cleanValue = (value, inputMode) => {
    if (inputMode === "numeric") {
      return value.replace(/\D/g, "").replace(/^0+/, "");
    }
    return value;
  };

  const handleExerciseFieldsChange = (id, field, value, inputMode) => {
    const cleanedValue = cleanValue(value, inputMode);
    setExercises((prev) =>
      prev.map((exercise) =>
        exercise.id === id ? { ...exercise, [field]: cleanedValue } : exercise,
      ),
    );

    setFormErrors((prev) => ({
      ...prev,
      exercises: {
        ...prev.exercises,
        [id]: {
          ...(prev.exercises[id] || {}),
          [field]: "",
        },
      },
    }));
  };

  return {
    exercises,
    setExercises,
    addExercise,
    deleteExercise,
    formErrors,
    setFormErrors,
    handleExerciseFieldsChange,
  };
}
