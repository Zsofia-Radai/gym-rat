import React from "react";
import deleteIcon from "../../../resources/deleteIcon.svg";
import closeIcon from "../../../resources/close.svg";
import Button from "../../../components/ui/Button/Button";
import { exerciseFields } from "../../../utils/templateFormUtils";
import styles from "./TemplateForm.module.css";

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
    <div className={styles.templateForm}>
      <form onSubmit={onSubmit}>
        <div className={styles.templateFormHeader}>
          <div>
            <input
              value={templateName}
              onChange={(e) => onTemplateNameChange(e)}
              name="templateName"
              placeholder="Template name"
              className={`${formErrors.templateName ? styles.inputError : ""}`}
            />
            {formErrors.templateName && (
              <div className={styles.formErrorMessage}>
                {formErrors.templateName}
              </div>
            )}
          </div>

          <div className={styles.cancelButton}>
            <Button type="button" variant={"icon"} onClick={onCancel}>
              <img src={closeIcon} alt="Close template form" />
            </Button>
          </div>
        </div>

        <div className={styles.exerciseForm}>
          {exercises.map((exercise, index) => (
            <React.Fragment key={exercise.id}>
              <div className={styles.exerciseHeader}>
                <span></span>
                <span>Sets</span>
                <span>Reps</span>
                <span>Kg</span>
              </div>
              <div className={styles.exerciseRow}>
                {exerciseFields.map((field) => {
                  const error = formErrors.exercises[exercise.id]?.[field.name];

                  return (
                    <div className={styles.cell} key={field.name}>
                      <input
                        type="text"
                        inputMode={field.inputMode}
                        className={`
                          ${field.inputMode === "numeric" ? styles.numericInput : ""}
                          ${error ? styles.inputError : ""}
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
                      <div className={styles.formErrorMessage}>
                        {error || "\u00A0"}
                      </div>
                    </div>
                  );
                })}

                <div className={`${styles.cell} ${styles.deleteCell}`}>
                  <Button
                    type="button"
                    variant={"icon"}
                    onClick={() => onDeleteExercise(exercise.id)}
                    aria-label="Delete exercise"
                  >
                    <img src={deleteIcon} alt="Delete exercise" />
                  </Button>
                  <span className={styles.error}>&nbsp;</span>
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>

        <div className={styles.formButtons}>
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
