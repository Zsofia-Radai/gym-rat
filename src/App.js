import "./App.css";
import { useEffect, useState } from "react";
import deleteIcon from "./resources/deleteIcon.svg";

function App() {
  const [toggleAddingTemplate, setToggleAddingTemplate] = useState(false);
  const [templateName, setTemplateName] = useState("");
  const [exercises, setExercises] = useState([
    { id: crypto.randomUUID(), name: "", sets: 0, reps: 0 },
  ]);
  const [templates, setTemplates] = useState(() => {
    const storedTemplates = JSON.parse(localStorage.getItem("templates"));
    return storedTemplates || [];
  });

  const [formErrors, setFormErrors] = useState({
    templateName: "",
    exercises: [],
  });

  useEffect(() => {
    localStorage.setItem("templates", JSON.stringify(templates));
  }, [templates]);

  const createTemplate = (name, exercises) => {
    return {
      id: crypto.randomUUID(),
      name: name,
      exercises: exercises,
    };
  };

  useEffect(() => {
    const storedTemplates = JSON.parse(localStorage.getItem("templates")) || [];
    setTemplates(storedTemplates);
  }, [exercises]);

  const toggleAddingTemplateForm = () => {
    setToggleAddingTemplate(!toggleAddingTemplate);
  };

  const addExercise = () => {
    setExercises((prev) => [
      ...prev,
      { id: crypto.randomUUID(), name: "", sets: 0, reps: 0 },
    ]);
  };

  const deleteTemplate = (id) => {
    setTemplates((prev) => {
      const updatedTemplates = prev.filter((t) => t.id !== id);
      localStorage.setItem("templates", JSON.stringify(updatedTemplates));
      return updatedTemplates;
    });
  };

  const deleteExercise = (id) => {
    const updatedExercises = exercises.filter((ex) => ex.id !== id);
    console.log(updatedExercises);
    setExercises((prev) => prev.filter((ex) => ex.id !== id));
  };

  const handleFormChange = (id, field, value) => {
    setExercises((prev) =>
      prev.map((exercise) =>
        exercise.id === id ? { ...exercise, [field]: value } : exercise,
      ),
    );
  };

  const isExerciseInvalid = (ex) => {
    const sets = Number(ex.sets);
    const reps = Number(ex.reps);
    return (
      !ex.name?.trim() ||
      !Number.isFinite(sets) ||
      !Number.isFinite(reps) ||
      sets <= 0 ||
      reps <= 0
    );
  };

  const validateForm = () => {
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

  const handleSaveTemplate = (e) => {
    e.preventDefault();

    const isValid = validateForm();

    if (!isValid) return;

    const template = createTemplate(templateName, exercises);

    setTemplates((prev) => [...prev, template]);
    setTemplateName("");
    setExercises([{ id: crypto.randomUUID(), name: "", sets: 0, reps: 0 }]);
    setToggleAddingTemplate(false);
  };

  return (
    <div className="app">
      <h2>GymRat</h2>
      <div>
        <div>Templates</div>
        <hr></hr>
        <button className="new-template-btn" onClick={toggleAddingTemplateForm}>
          New Template
        </button>
        {toggleAddingTemplate && (
          <div className="new-template-form">
            <form onSubmit={handleSaveTemplate}>
              <div className="template-name">
                <input
                  value={templateName}
                  onChange={(e) => setTemplateName(e.target.value)}
                  name="templateName"
                  placeholder="Template name"
                />
                {formErrors.templateName && (
                  <div className="form-error-message">
                    {formErrors.templateName}
                  </div>
                )}
              </div>

              {exercises.map((exercise, index) => (
                <div key={exercise.id} className="exercise-container">
                  <div className="new-exercise-form">
                    <input
                      type="text"
                      value={exercise.name}
                      onChange={(e) =>
                        handleFormChange(exercise.id, "name", e.target.value)
                      }
                      placeholder="Exercise name"
                    />
                    <input
                      type="number"
                      placeholder="Sets"
                      value={exercise.sets}
                      onChange={(e) =>
                        handleFormChange(exercise.id, "sets", e.target.value)
                      }
                    />
                    <input
                      type="number"
                      placeholder="Reps"
                      value={exercise.reps}
                      onChange={(e) =>
                        handleFormChange(exercise.id, "reps", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <img
                      className="delete-icon"
                      src={deleteIcon}
                      alt="Delete exercise"
                      onClick={() => deleteExercise(exercise.id)}
                    />
                  </div>
                  {formErrors.exercises[index]?.error && (
                    <div className="form-error-message">
                      Exercise details are required
                    </div>
                  )}
                </div>
              ))}

              <div className="form-buttons">
                <button type="button" onClick={addExercise}>
                  Add exercise
                </button>

                <button type="submit">Save Template</button>
              </div>
            </form>
          </div>
        )}
        <div>My templates</div>
        {templates.map((template) => (
          <div key={template.id} className="template">
            <h4>{template.name}</h4>
            <img
              src={deleteIcon}
              alt="Delete template"
              className="delete-icon"
              onClick={() => deleteTemplate(template.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
