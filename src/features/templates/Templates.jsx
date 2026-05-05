import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/ui/Button/Button";
import ConfirmDeleteModal from "../../components/ui/ConfirmDeleteModal/ConfirmDeleteModal";
import ToastNotification from "../../components/ui/ToastNotification/ToastNotification";
import { useExercises } from "../../hooks/useExercises";
import layout from "../../layout/AppLayout.module.css";
import deleteIcon from "../../resources/deleteIcon.svg";
import { createNewExercise } from "../../utils/templateFormUtils";
import { validateTemplateForm } from "../../utils/validation";
import NewTemplateForm from "./NewTemplateForm/NewTemplateForm";
import styles from "./Templates.module.css";
import { useTemplates } from "../../context/TemplatesContext";
import { TOAST_TYPE } from "../../App";

function Templates({showToast}) {
  const [toggleAddingTemplate, setToggleAddingTemplate] = useState(false);
  const [templateName, setTemplateName] = useState("");
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

  const { templates, addTemplate, deleteTemaple } = useTemplates();

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
    deleteTemaple(id);
    showToast("Template deleted!", TOAST_TYPE.DELETE);
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
    addTemplate(templateName, exercises);
    showToast("Template saved!", TOAST_TYPE.SAVE);
    setTemplateName("");
    setExercises([createNewExercise()]);
    setToggleAddingTemplate(false);
  };

  return (
    <div>
      <div className={`${layout.mutedPanel} ${styles.heroPanel}`}>
        <div>
          <p className={layout.overline}>Ready when you are</p>
          <h3>Pick a training plan</h3>
        </div>
        <Button type="button" onClick={toggleAddingTemplateForm}>
          New
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

      <div className={styles.sectionTitle}>
        <h3>My templates</h3>
        <span className={styles.countBadge}>{templates.length}</span>
      </div>

      {templates.length === 0 && (
        <div className={layout.emptyState}>
          <strong>No templates yet</strong>
          <span>Create your first workout template to start tracking.</span>
        </div>
      )}

      <div className={styles.templateList}>
        {templates.map((template) => (
          <Link
            key={template.id}
            to={`/template/${template.id}`}
            className={styles.templateLink}
          >
            <div className={styles.templateCard}>
              <span className={styles.templateMark}>
                {template.name.slice(0, 2)}
              </span>
              <span>
                <span className={styles.templateName}>{template.name}</span>
                <span className={styles.templateMeta}>
                  {template.exercises.length} exercises
                </span>
              </span>
              <span className={styles.deleteWrapper}>
                <Button
                  type="button"
                  variant="icon"
                  onClick={(e) => {
                    e.preventDefault();
                    setTemplateToDelete(template);
                  }}
                >
                  <img src={deleteIcon} alt="Delete template" />
                </Button>
              </span>
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
          type={"template"}
        />
      )}
    </div>
  );
}

export default Templates;
