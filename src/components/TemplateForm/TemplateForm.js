import React from "react";
import deleteIcon from "../../resources/deleteIcon.svg";
import closeIcon from "../../resources/close.svg";
import Button from "../Button/Button";
import { exerciseFields } from "../../utils/templateFormUtils";
import "./TemplateForm.css";

function TemplateForm({
  onSubmit,
  onCancel,
  formErrors,
  templateName,
  exercises,
  onExerciseFieldChange,
  onTemplateNameChange,
  onDeleteExercise,
  onAddExercise,
  setTemplateName,
}) {
  return (
    <div className="template-form">
      <form onSubmit={onSubmit}>
        <div className="template-form-header">
          <div className="template-name">
            <input
              value={templateName}
              onChange={(e) => onTemplateNameChange(e)}
              name="templateName"
              placeholder="Template name"
              className={`${formErrors.templateName ? "input-error" : ""}`}
            />
            {formErrors.templateName && (
              <div className="form-error-message">
                {formErrors.templateName}
              </div>
            )}
          </div>

          <div className="cancel-cell">
            <Button type="icon" variant={"icon"} onClick={onCancel}>
              <img src={closeIcon} alt="Close template form" />
            </Button>
          </div>
        </div>

        <div className="exercise-form">
          {exercises.map((exercise, index) => (
            <React.Fragment key={exercise.id}>
              <div className="exercise-header">
                <span></span>
                <span>Sets</span>
                <span>Reps</span>
                <span>Kg</span>
              </div>
              <div className="exercise-row">
                {exerciseFields.map((field) => {
                  const error = formErrors.exercises[exercise.id]?.[field.name];

                  return (
                    <div className="cell" key={field.name}>
                      <input
                        type="text"
                        inputMode={field.inputMode}
                        className={`
                          ${field.inputMode === "numeric" ? "numeric-input" : ""}
                          ${error ? "input-error" : ""}
                        `}
                        value={exercise[field.name]}
                        placeholder={field.placeholder}
                        onChange={(e) =>
                          onExerciseFieldChange(
                            exercise.id,
                            field.name,
                            e.target.value,
                            field.inputMode,
                          )
                        }
                      />

                      {error && (
                        <div className="form-error-message">{error}</div>
                      )}
                    </div>
                  );
                })}

                <div className="cell delete-cell">
                  <Button
                    type="icon"
                    variant={"icon"}
                    onClick={() => onDeleteExercise(exercise.id)}
                    aria-label="Delete exercise"
                  >
                    <img src={deleteIcon} alt="Delete exercise" />
                  </Button>
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>

        <div className="form-buttons">
          <Button type="button" onClick={onAddExercise}>
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

export default TemplateForm;
