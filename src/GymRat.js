import "./GymRat.css";
import { useEffect, useState } from "react";
import deleteIcon from "./resources/deleteIcon.svg";
import NewTemplateForm from "./components/NewTemplateForm/NewTemplateForm";
import { Link } from "react-router-dom";
import Button from "./components/Button/Button";

function GymRat({ templates, setTemplates }) {
  const [toggleAddingTemplate, setToggleAddingTemplate] = useState(false);
  const [templateName, setTemplateName] = useState("");
  const [exercises, setExercises] = useState([
    { id: crypto.randomUUID(), name: "", sets: 0, reps: 0, kg: 0 },
  ]);

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
  }, [exercises, setTemplates]);

  const toggleAddingTemplateForm = () => {
    setToggleAddingTemplate(!toggleAddingTemplate);
  };

  const addExercise = () => {
    setExercises((prev) => [
      ...prev,
      { id: crypto.randomUUID(), name: "", sets: 0, reps: 0, kg: 0 },
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
    setExercises([
      { id: crypto.randomUUID(), name: "", sets: 0, reps: 0, kg: 0 },
    ]);
    setToggleAddingTemplate(false);
  };

  return (
    <div className="page">
      <h2>GymRat</h2>
      <div>
        <div className="templates">Templates</div>
        <hr></hr>
        <Button type="button" onClick={toggleAddingTemplateForm}>
          New Template
        </Button>
        {toggleAddingTemplate && (
          <NewTemplateForm
            handleSaveTemplate={handleSaveTemplate}
            setTemplates={setTemplates}
            formErrors={formErrors}
            templateName={templateName}
            exercises={exercises}
            handleFormChange={handleFormChange}
            deleteExercise={deleteExercise}
            addExercise={addExercise}
            setTemplateName={setTemplateName}
            toggleAddingTemplateForm={toggleAddingTemplateForm}
          />
        )}
        <div className="templates">My templates</div>
        {templates.map((template) => (
          <Link
            key={template.id}
            to={`/template/${template.id}`}
            className="template-link"
          >
            <div className="template">
              <h4>{template.name}</h4>
              <Button
                type="icon"
                variant="icon"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  deleteTemplate(template.id);
                }}
              >
                <img src={deleteIcon} alt="Delete template" />
              </Button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default GymRat;
