import "./GymRat.css";
import { useEffect, useState } from "react";
import deleteIcon from "./resources/deleteIcon.svg";
import NewTemplateForm from "./components/NewTemplateForm/NewTemplateForm";
import { Link } from "react-router-dom";
import Button from "./components/Button/Button";
import { validateForm } from "./utils/validation";
import { createNewExercise } from "./utils/templateFormUtils";

function GymRat({ templates, setTemplates }) {
  const [toggleAddingTemplate, setToggleAddingTemplate] = useState(false);
  const [templateName, setTemplateName] = useState("");
  const [exercises, setExercises] = useState([createNewExercise()]);

  const [formErrors, setFormErrors] = useState({
    templateName: "",
    exercises: {},
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
    setExercises([createNewExercise()]);
    setTemplateName("");
    setFormErrors({
      templateName: "",
      exercises: {},
    });
    setToggleAddingTemplate(!toggleAddingTemplate);
  };

  const addExercise = () => {
    setExercises((prev) => [...prev, createNewExercise()]);
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

  const handleTemplateNameChange = (e) => {
    setTemplateName(e.target.value);
    setFormErrors((prev) => ({
      ...prev,
      templateName: "",
    }));
  };

  const cleanValue = (value) => value.replace(/^0+(\d)/, "$1");

  const handleExerciseFieldsChange = (id, field, value) => {
    const cleanedValue = cleanValue(value);
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

  const handleSaveTemplate = (e) => {
    e.preventDefault();

    const isValid = validateForm(templateName, exercises, setFormErrors);

    if (!isValid) return;

    const template = createTemplate(templateName, exercises);

    setTemplates((prev) => [...prev, template]);
    setTemplateName("");
    setExercises([createNewExercise()]);
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
            onSubmit={handleSaveTemplate}
            onCancel={toggleAddingTemplateForm}
            formErrors={formErrors}
            templateName={templateName}
            exercises={exercises}
            onExerciseFieldChange={handleExerciseFieldsChange}
            onTemplateNameChange={handleTemplateNameChange}
            onDeleteExercise={deleteExercise}
            onAddExercise={addExercise}
            setTemplateName={setTemplateName}
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
