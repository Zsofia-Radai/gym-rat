import "./Templates.css";
import { useEffect, useState } from "react";
import deleteIcon from "../../resources/deleteIcon.svg";
import NewTemplateForm from "./NewTemplateForm/NewTemplateForm";
import { Link } from "react-router-dom";
import Button from "../../components/ui/Button/Button";
import { validateTemplateForm } from "../../utils/validation";
import { createNewExercise } from "../../utils/templateFormUtils";
import { useExercises } from "../../hooks/useExercises";
import ToastNotification from "../../components/ui/ToastNotification/ToastNotification";
import ConfirmDeleteModal from "../../components/ui/ConfirmDeleteModal/ConfirmDeleteModal";

export const UI_STATE = {
  SAVE: "saved",
  DELETE: "deleted",
};

function Templates({ templates, setTemplates }) {
  const [toggleAddingTemplate, setToggleAddingTemplate] = useState(false);
  const [templateName, setTemplateName] = useState("");
  const [uIState, setUIState] = useState(UI_STATE.IDLE);
  const [templateToDelete, setTemplateToDelete] = useState(null);

  const {
    exercises,
    setExercises,
    addExercise,
    deleteExercise,
    formErrors,
    setFormErrors,
    handleExerciseFieldsChange,
  } = useExercises([createNewExercise()]);

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
  }, [setTemplates]);

  const toggleAddingTemplateForm = () => {
    setExercises([createNewExercise()]);
    setTemplateName("");
    setFormErrors({
      templateName: "",
      exercises: {},
    });
    setToggleAddingTemplate(!toggleAddingTemplate);
  };

  const deleteTemplate = (id) => {
    setTemplates((prev) => {
      const updatedTemplates = prev.filter((t) => t.id !== id);
      localStorage.setItem("templates", JSON.stringify(updatedTemplates));
      return updatedTemplates;
    });

    setUIState(UI_STATE.DELETE);
    setTimeout(() => {
      setUIState(UI_STATE.IDLE);
    }, 1500);
  };

  const handleTemplateNameChange = (e) => {
    setTemplateName(e.target.value);
    setFormErrors((prev) => ({
      ...prev,
      templateName: "",
    }));
  };

  const handleSaveTemplate = (e) => {
    e.preventDefault();

    const isValid = validateTemplateForm(
      templateName,
      exercises,
      setFormErrors,
    );

    if (!isValid) return;

    setUIState(UI_STATE.SAVE);

    const template = createTemplate(templateName, exercises);

    setTimeout(() => {
      setUIState(UI_STATE.IDLE);
    }, 1500);

    setTemplates((prev) => [...prev, template]);
    setTemplateName("");
    setExercises([createNewExercise()]);
    setToggleAddingTemplate(false);
  };

  return (
    <div className="page">
      {(uIState === UI_STATE.SAVE || uIState === UI_STATE.DELETE) && (
        <ToastNotification type={uIState} />
      )}
      <h2>GymRat</h2>
      <div>
        <div className="nav-links">
          <div>Templates</div>
          <Link className="nav-link" to={"/workout/sessions"}>
            <div>Sessions</div>
          </Link>
        </div>
        <hr></hr>
        <div className="new-template-button">
          <Button type="button" onClick={toggleAddingTemplateForm}>
            New Template
          </Button>
        </div>
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
                  setTemplateToDelete(template);
                }}
              >
                <img src={deleteIcon} alt="Delete template" />
              </Button>
            </div>
          </Link>
        ))}
      </div>
      {templateToDelete && (
        <ConfirmDeleteModal
          onCancel={() => setTemplateToDelete(null)}
          onDelete={() => {
            deleteTemplate(templateToDelete.id);
            setTemplateToDelete(null);
          }}
        />
      )}
    </div>
  );
}

export default Templates;
