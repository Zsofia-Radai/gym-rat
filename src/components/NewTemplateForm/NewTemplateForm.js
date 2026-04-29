import deleteIcon from "../../resources/deleteIcon.svg";
import closeIcon from "../../resources/close.svg";
import "./NewTemplateForm.css";
import Button from "../Button/Button";
import { exerciseFields } from "../../utils/exerciseFields";

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
  toggleAddingTemplateForm,
}) {
  return (
    <div className="new-template-form">
      <form onSubmit={handleSaveTemplate}>
        <div className="new-template-form-header">
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

          <Button
            type="icon"
            variant={"icon"}
            onClick={toggleAddingTemplateForm}
          >
            <img src={closeIcon} alt="Close template form" />
          </Button>
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
              {exerciseFields.map((field) => (
                <input
                  key={field.name}
                  type="text"
                  inputMode={field.inputMode}
                  className={
                    field.inputMode === "numeric" ? "numeric-input" : ""
                  }
                  value={exercise[field.name]}
                  placeholder={field.placeholder}
                  onChange={(e) =>
                    handleFormChange(exercise.id, field.name, e.target.value)
                  }
                />
              ))}

              <Button
                type="icon"
                variant={"icon"}
                onClick={() => deleteExercise(exercise.id)}
                aria-label="Delete exercise"
              >
                <img src={deleteIcon} alt="Delete exercise" />
              </Button>
            </div>
            {formErrors.exercises[index]?.error && (
              <div className="form-error-message">
                Exercise details are required
              </div>
            )}
          </div>
        ))}

        <div className="form-buttons">
          <Button type="button" onClick={addExercise}>
            Add exercise
          </Button>

          <Button type="submit" variant={"submit"}>
            Save Template
          </Button>
        </div>
      </form>
    </div>
  );
}

export default NewTemplateForm;
