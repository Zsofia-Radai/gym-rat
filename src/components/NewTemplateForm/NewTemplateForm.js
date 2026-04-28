import deleteIcon from "../../resources/deleteIcon.svg";
import "./NewTemplateForm.css";

function NewTemplateForm({
  handleSaveTemplate,
  setTemplates,
  formErrors,
  templateName,
  exercises,
  handleFormChange,
  deleteExercise,
  addExercise,
  setTemplateName,
}) {
  return (
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
            <div className="form-error-message">{formErrors.templateName}</div>
          )}
        </div>

        {exercises.map((exercise, index) => (
          <div key={exercise.id} className="exercise-container">
            <div className="exercise-header">
              <span></span>
              <span>Sets</span>
              <span>Reps</span>
              <span>Kg</span>
            </div>

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
                className="numeric-input"
                type="text"
                inputMode="numeric"
                placeholder="Sets"
                value={exercise.sets}
                onChange={(e) =>
                  handleFormChange(exercise.id, "sets", e.target.value)
                }
              />
              <input
                className="numeric-input"
                type="text"
                inputMode="numeric"
                placeholder="Reps"
                value={exercise.reps}
                onChange={(e) =>
                  handleFormChange(exercise.id, "reps", e.target.value)
                }
              />
              <input
                className="numeric-input"
                type="text"
                inputMode="numeric"
                placeholder="kg"
                value={exercise.kg}
                onChange={(e) =>
                  handleFormChange(exercise.id, "kg", e.target.value)
                }
              />
              <div>
                <img
                  className="delete-icon"
                  src={deleteIcon}
                  alt="Delete exercise"
                  onClick={() => deleteExercise(exercise.id)}
                />
              </div>
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
  );
}

export default NewTemplateForm;
