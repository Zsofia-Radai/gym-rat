import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import closeIcon from "../../resources/close.svg";
import "./EditTemplate.css";
import Button from "../Button/Button";
import { exerciseFields } from "../../utils/exerciseFields";

function EditTemplate({ templates, setTemplates }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const template = templates.find((t) => t.id === id);

  const [name, setName] = useState("");
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    if (template) {
      setName(template.name);
      setExercises(template.exercises);
    }
  }, [template]);

  if (!template) return <div>Template not found</div>;

  const handleSaveTemplate = (e) => {
    e.preventDefault();

    setName(template.name);
    setTemplates((prev) =>
      prev.map((t) => {
        return t.id === id ? { ...t, name, exercises } : t;
      }),
    );

    navigate(`/template/${id}`);
  };

  return (
    <div className="page">
      <form onSubmit={handleSaveTemplate}>
        <div className="edit-template-header">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            name="templateName"
            placeholder="Template name"
            className="edit-template-name-input"
          />
          <Button type="icon" variant={"icon"} onClick={() => navigate(-1)}>
            <img src={closeIcon} alt="Close edit form" />
          </Button>
        </div>
        {exercises.map((exercise, index) => (
          <div key={exercise.id} className="exercise-container">
            <div className="edit-exercise-details-header">
              <span></span>
              <span>Sets</span>
              <span>Reps</span>
              <span>Kg</span>
            </div>

            <div className="edit-exercise-form">
              {exerciseFields.map((field) => (
                <input
                  key={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                  value={exercise[field.name]}
                  className={
                    field.inputMode === "numeric" ? "numeric-input" : ""
                  }
                  onChange={(e) => {
                    const updated = [...exercises];
                    updated[index] = {
                      ...updated[index],
                      [field.name]: e.target.value,
                    };
                    setExercises(updated);
                  }}
                />
              ))}
            </div>
          </div>
        ))}
        <div className="form-buttons">
          <Button type="button" variant={"cancel"} onClick={() => navigate(-1)}>
            Cancel
          </Button>
          <Button type="submit" variant={"submit"}>
            Save changes
          </Button>
        </div>
      </form>
    </div>
  );
}

export default EditTemplate;
