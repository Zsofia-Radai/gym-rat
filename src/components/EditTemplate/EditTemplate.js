import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useExercises } from "../../hooks/useExercises";
import { validateForm } from "../../utils/validation";
import TemplateForm from "../TemplateForm/TemplateForm";

function EditTemplate({ templates, setTemplates }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const template = templates.find((t) => t.id === id);

  const [name, setName] = useState("");

  const {
    exercises,
    setExercises,
    addExercise,
    deleteExercise,
    formErrors,
    setFormErrors,
    handleExerciseFieldsChange,
  } = useExercises(template.exercises);

  useEffect(() => {
    if (template) {
      setName(template.name);
      setExercises(template.exercises);
    }
  }, [template, setExercises]);

  if (!template) return <div>Template not found</div>;

  const handleSaveTemplate = (e) => {
    e.preventDefault();

    const isValid = validateForm(name, exercises, setFormErrors);

    if (!isValid) return;

    setName(template.name);
    setTemplates((prev) =>
      prev.map((t) => {
        return t.id === id ? { ...t, name, exercises } : t;
      }),
    );

    navigate(`/template/${id}`);
  };

  const cancelEdit = () => {
    navigate(-1);
  };

  const handleTemplateNameChange = (e) => {
    setName(e.target.value);
    setFormErrors((prev) => ({
      ...prev,
      templateName: "",
    }));
  };

  return (
    <div className="page">
      <TemplateForm
        onSubmit={handleSaveTemplate}
        onCancel={cancelEdit}
        formErrors={formErrors}
        templateName={name}
        exercises={exercises}
        onExerciseFieldChange={handleExerciseFieldsChange}
        onTemplateNameChange={handleTemplateNameChange}
        onDeleteExercise={deleteExercise}
        onAddExercise={addExercise}
        setTemplateName={setName}
      />
    </div>
  );
}

export default EditTemplate;
