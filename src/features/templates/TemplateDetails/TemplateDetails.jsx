import { Link, useNavigate, useParams } from "react-router-dom";
import edit from "../../../resources/edit.png";
import previous from "../../../resources/previous.png";
import Button from "../../../components/ui/Button/Button";
import layout from "../../../layout/AppLayout.module.css";
import styles from "./TemplateDetails.module.css";
import { useEffect } from "react";
import { useTemplates } from "../../../context/TemplatesContext";
import { createSession } from "../../../utils/sessionsUtils";

function TemplateDetails({ setSessions, sessions }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { templates } = useTemplates();
  const template = templates.find((t) => t.id === id);

  useEffect(() => {
    localStorage.setItem("sessions", JSON.stringify(sessions));
  }, [sessions]);

  if (!template) {
    return (
      <div className={`${layout.page} ${layout.narrow}`}>
        <div className={layout.emptyState}>
          <strong>Template not found</strong>
          <span>This workout template is no longer available.</span>
        </div>
      </div>
    );
  }

  const startSession = () => {
    const session = createSession(template);
    setSessions((prev) => [...prev, session]);
    navigate(`/workout/session/${session.id}`);
  };

  return (
    <div className={`${layout.page} ${layout.wide}`}>
      <header className={layout.topbar}>
        <div className={layout.titleBlock}>
          <p className={layout.overline}>Template</p>
          <h2 className={layout.title}>{template.name}</h2>
        </div>
        <div className={styles.actions}>
          <Button variant={"submit"} onClick={() => startSession()}>
            Start workout
          </Button>
          <Link to={`/template/${template.id}/edit`}>
            <Button type="button" variant={"icon"}>
              <img src={edit} alt="Edit exercise" />
            </Button>
          </Link>
        </div>
      </header>

      <div className={styles.metricStrip}>
        <span className={styles.metric}>
          <strong>{template.exercises.length}</strong> exercises
        </span>
        <span className={styles.metric}>
          <strong>
            {template.exercises.reduce(
              (total, exercise) => total + Number(exercise.sets || 0),
              0,
            )}
          </strong>
          sets
        </span>
        <span className={styles.metric}>
          <strong>
            {template.exercises.reduce(
              (total, exercise) =>
                total +
                Number(exercise.sets || 0) *
                  Number(exercise.reps || 0) *
                  Number(exercise.kg || 0),
              0,
            )}
          </strong>
          planned kg
        </span>
      </div>

      <div className={styles.exerciseList}>
        {template.exercises.map((exercise) => (
          <article key={exercise.id} className={styles.exerciseCard}>
            <div>
              <h3>{exercise.name}</h3>
              <p>Workout movement</p>
            </div>
            <dl className={styles.stats}>
              <div>
                <dt>Sets</dt>
                <dd>{exercise.sets}</dd>
              </div>
              <div>
                <dt>Reps</dt>
                <dd>{exercise.reps}</dd>
              </div>
              <div>
                <dt>Kg</dt>
                <dd>{exercise.kg}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
      <div className={styles.backButton}>
        <Button type="button" variant={"icon"} onClick={() => navigate("/")}>
          <img src={previous} alt="Back" />
        </Button>
      </div>
    </div>
  );
}

export default TemplateDetails;
