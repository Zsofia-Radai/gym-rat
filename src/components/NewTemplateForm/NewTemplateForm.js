import React from "react";
import deleteIcon from "../../resources/deleteIcon.svg";
import closeIcon from "../../resources/close.svg";
import "./NewTemplateForm.css";
import Button from "../Button/Button";
import { exerciseFields } from "../../utils/templateFormUtils";

function NewTemplateForm({
  handleSaveTemplate,
  setTemplates,
  formErrors,
  templateName,
  exercises,
  handleExerciseFieldsChange,
  handleTemplateNameChange,
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
              onChange={(e) => handleTemplateNameChange(e)}
              name="templateName"
              placeholder="Template name"
            />
            {formErrors.templateName && (
              <div className="form-error-message">
                {formErrors.templateName}
              </div>
            )}
          </div>

          <div className="cancel-cell">
            <Button
              type="icon"
              variant={"icon"}
              onClick={toggleAddingTemplateForm}
            >
              <img src={closeIcon} alt="Close template form" />
            </Button>
          </div>
        </div>

        <div className="exercise-header">
          <span></span>
          <span>Sets</span>
          <span>Reps</span>
          <span>Kg</span>
        </div>

        <div className="new-exercise-form">
          {exercises.map((exercise, index) => (
            <div key={exercise.id} className="exercise-row">
              {exerciseFields.map((field) => {
                const error = formErrors.exercises[exercise.id]?.[field.name];

                return (
                  <div className="cell" key={field.name}>
                    <input
                      type="text"
                      inputMode={field.inputMode}
                      className={
                        field.inputMode === "numeric" ? "numeric-input" : ""
                      }
                      value={exercise[field.name]}
                      placeholder={field.placeholder}
                      onChange={(e) =>
                        handleExerciseFieldsChange(
                          exercise.id,
                          field.name,
                          e.target.value,
                        )
                      }
                    />

                    {error && <div className="form-error-message">{error}</div>}
                  </div>
                );
              })}

              <div className="cell delete-cell">
                <Button
                  type="icon"
                  variant={"icon"}
                  onClick={() => deleteExercise(exercise.id)}
                  aria-label="Delete exercise"
                >
                  <img src={deleteIcon} alt="Delete exercise" />
                </Button>
              </div>
            </div>
          ))}
        </div>

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
