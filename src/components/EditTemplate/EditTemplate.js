import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./EditTemplate.css";

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

    setTemplates((prev) =>
      prev.map((t) => {
        console.log(id);
        return t.id === id ? { ...t, name, exercises } : t;
      }),
    );

    navigate(`/template/${id}`);
  };

  return (
    <div className="page">
      <h2>Edit Template: {name}</h2>

      <form onSubmit={handleSaveTemplate}>
        {exercises.map((exercise, index) => (
          <div className="exercise-container">
            <div className="edit-exercise-details-header">
              <span></span>
              <span>Sets</span>
              <span>Reps</span>
              <span>Kg</span>
            </div>

            <div key={exercise.id} className="edit-exercise-form">
              <input
                type="text"
                value={exercise.name}
                onChange={(e) => {
                  const updated = [...exercises];
                  updated[index].name = e.target.value;
                  setExercises(updated);
                }}
              />
              <input
                className="numeric-input"
                type="text"
                inputMode="numeric"
                value={exercise.sets}
                onChange={(e) => {
                  const updated = [...exercises];
                  updated[index].sets = e.target.value;
                  setExercises(updated);
                }}
              />
              <input
                className="numeric-input"
                type="text"
                inputMode="numeric"
                value={exercise.reps}
                onChange={(e) => {
                  const updated = [...exercises];
                  updated[index].reps = e.target.value;
                  setExercises(updated);
                }}
              />
              <input
                className="numeric-input"
                type="text"
                inputMode="numeric"
                value={exercise.kg}
                onChange={(e) => {
                  const updated = [...exercises];
                  updated[index].kg = e.target.value;
                  setExercises(updated);
                }}
              />
            </div>
          </div>
        ))}
        <div className="form-buttons">
          <button type="button" onClick={() => navigate(-1)}>
            Cancel
          </button>
          <button type="submit">Save changes</button>
        </div>
      </form>
    </div>
  );
}

export default EditTemplate;
