import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createNewExercise } from "../../utils/templateFormUtils";
import { validateForm } from "../../utils/validation";
import TemplateForm from "../TemplateForm/TemplateForm";
import "./EditTemplate.css";

function EditTemplate({ templates, setTemplates }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const template = templates.find((t) => t.id === id);

  const [name, setName] = useState("");
  const [exercises, setExercises] = useState([]);

  const [formErrors, setFormErrors] = useState({
    templateName: "",
    exercises: {},
  });

  useEffect(() => {
    if (template) {
      setName(template.name);
      setExercises(template.exercises);
    }
  }, [template]);

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

  const addExercise = () => {
    setExercises((prev) => [...prev, createNewExercise()]);
  };

  const deleteExercise = (id) => {
    setExercises((prev) => prev.filter((ex) => ex.id !== id));
  };

  const cancelEdit = () => {
    navigate(-1);
  };

  const handleExerciseFieldsChange = (id, field, value) => {
    setExercises((prev) =>
      prev.map((exercise) =>
        exercise.id === id ? { ...exercise, [field]: value } : exercise,
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
